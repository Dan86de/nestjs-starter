import { Status } from '@prisma/client';

export class IamStatusEntity implements Status {
  id: number;
  name: string;
}
