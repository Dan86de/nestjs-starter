import { Inject, Injectable } from '@nestjs/common';
import { Cacheable } from 'cacheable';

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_INSTANCE') private readonly cache: Cacheable) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cache.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async reset(): Promise<void> {
    // await this.cache.reset();
    await this.cache.clear();
  }
  //
  // async onModuleDestroy() {
  //   const redisClient = (this.cache.store as any).getClient();
  //   redisClient.quit();
  // }
}
