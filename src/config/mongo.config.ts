import { registerAs } from '@nestjs/config';

export interface MongoConfig {
  readonly host: string;
  readonly port: number;
  readonly db: string;
  readonly uri: string;
}

export const mongoLoader = registerAs('mongo', () => ({
  host: process.env['MONGO.HOST'],
  port: process.env['MONGO.PORT'],
  db: process.env['MONGO.DB'],
  get uri(): string {
    return `mongodb://${this.host}:${this.port}/${this.db}`;
  },
}));
