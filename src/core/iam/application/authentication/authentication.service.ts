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

@Injectable()
export class AuthenticationService {
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

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
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

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      } as IamActiveUserEntity,
      {
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_TTL'),
      },
    );

    return { accessToken };
  }
}
