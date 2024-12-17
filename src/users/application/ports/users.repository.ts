import { User } from '../../domain/user';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
}
