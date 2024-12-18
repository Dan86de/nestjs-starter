import { Injectable } from '@nestjs/common';
import { UsersRepository } from './ports/users.repository';
import { UserFactory } from '../domain/factories/user.factory';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    public readonly userFactory: UserFactory,
  ) {}
  findAll() {
    return this.usersRepository.findAll();
  }
}
