import { Injectable } from '@nestjs/common';
import { CacheService } from './core/cache/cache.service';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  context: string;
  constructor(
    public readonly logger: LoggerService,
    public readonly databaseService: DatabaseService,
    public readonly cache: CacheService,
  ) {
    this.context = 'AppService';
  }
  async getHello() {
    this.logger.log('calling log from inside getHello method', this.context, {
      userId: 123,
      isPremium: true,
    });
    this.databaseService.user.findMany();
    this.cache.set('key', 'VALUE FROM CACHE', 1000);
    const valueFromCache = await this.cache.get('key');
    console.log('valueFromCache', valueFromCache);
    return 'Hello World!';
  }
}
