import { RoleEntity } from './role.entity';
import { StatusEntity } from './status.entity';

export class UserEntity {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: RoleEntity;
  status: StatusEntity;
}
