import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IamUsersRepository } from '../ports/users.repository';
import { HashingService } from '../ports/hashing.service';
import { SignUpDto } from '../../presenters/http/authentication/dto/sign-up.dto';
import { SignInDto } from '../../presenters/http/authentication/dto/sign-in.dto';
import { IamUser } from '../../domain/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../../config';
import { IamActiveUserEntity } from '../decorators/entities/iam-active-user.entity';
import { RefreshTokenDto } from '../../presenters/http/authentication/dto/refresh-token.dto';
import { AuthenticationService } from '../ports/authentication.service';

@Injectable()
export class AuthService implements AuthenticationService {
  constructor(
    private readonly usersRepository: IamUsersRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IamUser> {
    if (signUpDto.role) {
      const role = await this.usersRepository.findRoleByName(signUpDto.role);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
    }

    const hashedPassword = await this.hashingService.hash(signUpDto.password);

    return await this.usersRepository.save({
      email: signUpDto.email,
      password: hashedPassword,
      role: signUpDto.role,
      status: signUpDto.status,
    });
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isPasswordValid = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateTokens(user);
  }

  async generateTokens(user: IamUser) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IamActiveUserEntity>>(
        user.id,
        this.configService.get('JWT_ACCESS_TOKEN_TTL')!,
        {
          email: user.email,
          role: user.role,
        },
      ),
      this.signToken(
        user.id,
        this.configService.get('JWT_REFRESH_TOKEN_TTL')!,
        { email: user.email },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { email } = await this.jwtService.verifyAsync<
        Pick<IamActiveUserEntity, 'email'>
      >(refreshTokenDto.refreshToken, {
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.usersRepository.findByEmail(email);
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      } as IamActiveUserEntity,
      {
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_TTL'),
      },
    );
  }
}
