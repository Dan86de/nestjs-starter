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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: IamUsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IamUser> {
    if (signUpDto.role) {
      const role = await this.usersRepository.findRoleByName(signUpDto.role);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
    }

    const hashedPassword = await this.hashingService.hash(signUpDto.password);

    try {
      return await this.usersRepository.save({
        email: signUpDto.email,
        password: hashedPassword,
        role: signUpDto.role,
        status: signUpDto.status,
      });
    } catch (error) {
      console.log('CODE', (error as PrismaClientKnownRequestError).code);
      throw new Error('Something went wrong');
    }
  }

  async signIn(signInDto: SignInDto): Promise<boolean> {
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

    return true;
  }
}
