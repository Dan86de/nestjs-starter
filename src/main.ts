import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
import cookieParser from 'cookie-parser';
import { AppEnvironmentVariables } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService<AppEnvironmentVariables, true>);
  const port = configService.get<AppEnvironmentVariables['PORT']>('PORT');
  const apiPrefix =
    configService.get<AppEnvironmentVariables['API_PREFIX']>('API_PREFIX');
  const host = `0.0.0.0`;
  app.setGlobalPrefix(apiPrefix!, {
    exclude: ['/'],
  });
  app.useLogger(app.get(LoggerService));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port!, host);
}

bootstrap();
