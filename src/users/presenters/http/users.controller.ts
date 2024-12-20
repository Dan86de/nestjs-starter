import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../../domain/user';
import { ActiveUserDecorator } from '../../../core/iam/application/decorators/active-user.decorator';
import { IamActiveUserEntity } from '../../../core/iam/application/decorators/entities/iam-active-user.entity';
import { Roles } from '../../../core/iam/application/decorators/role.decorator';

@Controller({
  path: 'users',
  version: '1',
})
@Roles('ADMIN')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    isArray: true,
    type: User,
    description: 'Returns a list of users',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@ActiveUserDecorator() user: IamActiveUserEntity) {
    console.log(user);
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    type: User,
    description: 'Returns a user by id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @ApiNoContentResponse({
    description: 'User deleted',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') userId: string) {
    return this.usersService.delete(userId);
  }
}
