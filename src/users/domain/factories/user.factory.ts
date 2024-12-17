import { User } from '../user';
import { Injectable } from '@nestjs/common';

interface CreateUserDto {
  id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class UserFactory {
  create(data: CreateUserDto): User {
    return new User(
      data.id,
      data.email,
      data.role,
      data.status,
      data.firstName,
      data.lastName,
    );
  }
}
