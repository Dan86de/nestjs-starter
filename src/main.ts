import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const port = configService.get<EnvironmentVariables['PORT']>('PORT');
  const host = `0.0.0.0`;
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port, host);
}

bootstrap();
