import { IamUser } from '../../../../domain/user';
import { IamUserEntity } from '../entities/iam-user.entity';

export class IamUserMapper {
  static toDomain(user: IamUserEntity): IamUser {
    return new IamUser(user.id, user.email, user.role.name, user.status.name);
  }
}
