import { Module } from '@nestjs/common';
import { InMemoryUserPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { OrmUsersPersistenceModule } from './persistence/orm/orm-persistence.module';
import { ApplicationBootstrapOptions } from '../../common/interfaces/application-bootstrap-options.interface';

@Module({})
export class UsersInfrastructureModule {
  static use(driver: ApplicationBootstrapOptions['driver']) {
    const persistenceModule =
      driver === 'orm'
        ? OrmUsersPersistenceModule
        : InMemoryUserPersistenceModule;

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
