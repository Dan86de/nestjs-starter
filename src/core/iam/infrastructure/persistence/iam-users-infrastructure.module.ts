import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../../../../common/interfaces/application-bootstrap-options.interface';
import { IamInMemoryUserPersistenceModule } from './in-memory/in-memory-persistence.module';
import { IamOrmUsersPersistenceModule } from './orm/orm-persistence.module';

@Module({})
export class IamUsersInfrastructureModule {
  static use(driver: ApplicationBootstrapOptions['driver']) {
    const persistenceModule =
      driver === 'orm'
        ? IamOrmUsersPersistenceModule
        : IamInMemoryUserPersistenceModule;

    return {
      module: IamUsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
