import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { IamModule } from './iam/application/iam.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { IamUsersInfrastructureModule } from './iam/infrastructure/persistence/iam-users-infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import config, { configurationValidationSchema } from '../config';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './logger/logger.middleware';

@Global()
@Module({})
export class CoreModule implements NestModule {
  static register(options: ApplicationBootstrapOptions = { driver: 'orm' }) {
    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          validationSchema: configurationValidationSchema,
        }),
        IamModule.withInfrastructure(
          IamUsersInfrastructureModule.use(options.driver),
        ),
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: TransformResponseInterceptor,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL, version: ['1'] });
  }
}
