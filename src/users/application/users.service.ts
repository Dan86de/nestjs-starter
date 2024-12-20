import { Injectable } from '@nestjs/common';
import { UsersRepository } from './ports/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  findAll() {
    return this.usersRepository.findAll();
  }
  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }
  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
