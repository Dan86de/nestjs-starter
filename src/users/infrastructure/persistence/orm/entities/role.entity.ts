import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  name: string;
}
