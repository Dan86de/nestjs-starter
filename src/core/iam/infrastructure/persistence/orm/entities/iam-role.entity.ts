import { Role } from '@prisma/client';

export class IamRoleEntity implements Role {
  id: number;
  name: string;
}
