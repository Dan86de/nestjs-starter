import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/application/users.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaErrorFilter } from './database/prisma/filters/prisma-error-filter/prisma-error.filter';
import { IamModule } from './core/iam/application/iam.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    CoreModule,
    IamModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaErrorFilter,
    },
  ],
})
export class AppModule {}
