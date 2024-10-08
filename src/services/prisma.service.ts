import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaClientExtended } from '~/utils/prisma';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async checkAndCreateSequence(name: string) {
    const exists = await this.$queryRaw`
      SELECT EXISTS (
        SELECT 1
        FROM pg_class
        WHERE relkind = 'S' AND relname = ${name}
      ) as exists
    `.then((res) => res[0].exists);
    if (!exists) {
      const sql = `CREATE SEQUENCE ${name} START 1`;
      await this.$executeRawUnsafe(sql);
    }
  }

  async getCode(prefix: string, name: string) {
    const date = dayjs().format('YYYYMMDD');
    const code = await this.client.$queryRaw`
      SELECT nextval(${name}) AS code
    `.then((res) => res[0].code);
    return `${prefix}${date}${code.toString().padStart(4, '0')}`;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
