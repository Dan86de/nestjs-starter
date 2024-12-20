import { Module } from '@nestjs/common';
import { OrmUsersPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [OrmUsersPersistenceModule],
  exports: [OrmUsersPersistenceModule],
})
export class UsersInfrastructureModule {}
