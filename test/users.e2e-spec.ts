import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { server } from './setup';
import { UsersModule } from '../src/modules/users/users.module';
import { AppModule } from '../src/app.module';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const request = require('supertest');

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/users (GET)', () => {
    return request(server).get('/users').expect(200).expect({ data: [] });
  });
});
