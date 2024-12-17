import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/application/users.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { UsersInfrastructureModule } from './users/infrastructure/users-infrastructure.module';

@Module({})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        UsersModule.withInfrastructure(
          UsersInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
