import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AppService } from './app.service';
import { CacheService } from './core/cache/cache.service';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: LoggerService, useValue: createMock<LoggerService>() },
        { provide: CacheService, useValue: createMock<CacheService>() },
        { provide: DatabaseService, useValue: mockDeep<DatabaseService>() },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appService.getHello();
      await expect(result).toBe('Hello World!');
    });
  });
});
