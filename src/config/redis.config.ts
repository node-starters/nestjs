import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  readonly host: string;
  readonly port: number;
  readonly db: number;
  readonly uri: string;
}

export const redisLoader = registerAs('redis', () => ({
  host: process.env['REDIS.HOST'],
  port: process.env['REDIS.PORT'],
  db: parseInt(process.env['REDIS.DB'] || '0', 10),
  get uri(): string {
    return `redis://${this.host}:${this.port}`;
  },
}));
