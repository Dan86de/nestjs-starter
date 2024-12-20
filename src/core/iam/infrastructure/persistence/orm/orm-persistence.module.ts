import { Module } from '@nestjs/common';
import { IamUsersRepository } from '../../../application/ports/users.repository';
import { IamOrmUserRepository } from './repository/users.repository';
import { PrismaModule } from '../../../../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IamUsersRepository,
      useClass: IamOrmUserRepository,
    },
  ],
  exports: [IamUsersRepository],
})
export class IamOrmUsersPersistenceModule {}
