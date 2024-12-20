import { User } from '../../domain/user';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
