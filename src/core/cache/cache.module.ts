import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import KeyvRedis from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('REDIS_USERNAME');
        const password = configService.get('REDIS_PASSWORD');
        const host = configService.get('REDIS_HOST');
        const port = configService.get('REDIS_PORT');
        const secondary = new KeyvRedis(
          `redis://${username}:${password}@${host}:${port}`,
        );
        return new Cacheable({ secondary, ttl: 10 });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}
