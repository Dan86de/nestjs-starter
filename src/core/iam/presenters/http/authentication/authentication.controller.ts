import { AuthenticationService } from '../../../application/authentication/authentication.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IamUser } from '../../../domain/user';

@Controller({
  path: 'authentication',
  version: '1',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<IamUser> {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<boolean> {
    return this.authenticationService.signIn(signInDto);
  }
}
