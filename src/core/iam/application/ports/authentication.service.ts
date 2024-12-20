import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../../presenters/http/authentication/dto/sign-up.dto';
import { SignInDto } from '../../presenters/http/authentication/dto/sign-in.dto';
import { IamUser } from '../../domain/user';
import { RefreshTokenDto } from '../../presenters/http/authentication/dto/refresh-token.dto';

@Injectable()
export abstract class AuthenticationService {
  abstract signUp(signUpDto: SignUpDto): Promise<IamUser>;
  abstract signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  abstract generateTokens(
    user: IamUser,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  abstract refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
