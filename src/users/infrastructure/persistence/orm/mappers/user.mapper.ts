import { UserEntity } from '../entities/user.entity';
import { User } from '../../../../domain/user';

export class UserMapper {
  static toDomain(user: UserEntity): User {
    return new User(
      user.id,
      user.email,
      user.role.name,
      user.status.name,
      user.firstName ?? undefined,
      user.lastName ?? undefined,
    );
  }
}
