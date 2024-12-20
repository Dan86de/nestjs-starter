import { Module } from '@nestjs/common';
import { UsersRepository } from '../../../application/ports/users.repository';
import { OrmUserRepository } from './repositories/users.repository';
import { PrismaModule } from '../../../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UsersRepository,
      useClass: OrmUserRepository,
    },
  ],
  exports: [UsersRepository],
})
export class OrmUsersPersistenceModule {}
