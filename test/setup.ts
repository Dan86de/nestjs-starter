import { HttpServer, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import helmet from 'helmet';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { LoggerService } from '../src/logger/logger.service';

let app: INestApplication;
let server: HttpServer;
let moduleFixture: TestingModule;
let database: PrismaService;

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  // Apply consistent set up to main.ts
  app = moduleFixture.createNestApplication();
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Get instances of services
  database = moduleFixture.get<PrismaService>(PrismaService);

  await app.init();
  server = app.getHttpServer();
});

afterEach(async () => {
  await database.resetDb();
});

afterAll(async () => {
  await app.close();
});

export { app, server };
