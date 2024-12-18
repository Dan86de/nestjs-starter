import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '../../domain/user';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    isArray: true,
    type: User,
    description: 'Returns a list of users',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }
}
