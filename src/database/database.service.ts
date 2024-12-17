import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async resetDb() {
    const tableNames: Array<{ tableName: string }> = await this.$queryRaw<
      Array<{ tableName: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tableNames
      .map(({ tableName }) => tableName)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    try {
      await this.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
      console.log({ error });
    }
  }
}
