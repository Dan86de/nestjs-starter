import { Module } from '@nestjs/common';
import { IamOrmUsersPersistenceModule } from './orm/orm-persistence.module';

@Module({
  imports: [IamOrmUsersPersistenceModule],
  exports: [IamOrmUsersPersistenceModule],
})
export class IamUsersInfrastructureModule {}
