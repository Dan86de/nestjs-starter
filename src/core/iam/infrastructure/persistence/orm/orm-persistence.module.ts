import { Module } from '@nestjs/common';
import { IamOrmUserRepository } from './repository/users.repository';
import { PrismaModule } from '../../../../../database/prisma/prisma.module';
import { IamUsersRepository } from '../../../application/ports/authentication-users.repository';

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
