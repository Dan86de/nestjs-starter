import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register(), {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const port = configService.get<EnvironmentVariables['PORT']>('PORT');
  const apiPrefix =
    configService.get<EnvironmentVariables['API_PREFIX']>('API_PREFIX');
  const host = `0.0.0.0`;
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port, host);
}

bootstrap();
