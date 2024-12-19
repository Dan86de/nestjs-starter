import { IamRoleEntity } from './iam-role.entity';
import { IamStatusEntity } from './iam-status.entity';

export class IamUserEntity {
  id: string;
  email: string;
  role: IamRoleEntity;
  status: IamStatusEntity;
}
