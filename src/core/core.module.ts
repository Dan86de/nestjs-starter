import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config, { configurationValidationSchema } from '../config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrismaModule } from '../database/prisma.module';
import { CacheService } from './cache/cache.service';
import { CacheModule } from './cache/cache.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

@Global()
@Module({})
export class CoreModule implements NestModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const infra = options.driver === 'orm' ? [PrismaModule] : [];

    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          validationSchema: configurationValidationSchema,
        }),
        ...infra,
        CacheModule,
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: TransformResponseInterceptor,
        },
        LoggerService,
        CacheService,
      ],
      exports: [LoggerService, CacheService],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
