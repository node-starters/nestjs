import * as Joi from 'joi';
import { secretLoader, SecretConfig } from './secret.config';
import { MongoConfig, mongoLoader } from './mongo.config';
import { AdminConfig, adminLoader } from './admin.config';
import { RedisConfig, redisLoader } from './redis.config';

export interface EnvConfig {
  port: number;
  secrets: SecretConfig;
  mongo: MongoConfig;
  admin: AdminConfig;
  redis: RedisConfig;
}

export const loaders = [
  () => ({
    port: parseInt(process.env['PORT'], 10) || 3000,
  }),
  secretLoader,
  mongoLoader,
  redisLoader,
  adminLoader,
];

const JPort = Joi.number().integer();
const JSecret = Joi.string().min(1);
const JEmail = Joi.string().email();

export const schema = Joi.object({
  PORT: JPort.required(),
  'SECRETS.MAIL_TOKEN': JSecret.required(),
  'MONGO.HOST': Joi.string().min(1).required(),
  'MONGO.PORT': JPort.required(),
  'MONGO.DB': Joi.string().min(1).required(),
  'ADMIN.NAME': Joi.string().min(1).required(),
  'ADMIN.EMAIL': JEmail.required(),
  'ADMIN.PASSWORD': Joi.string().min(1).required(),
  'REDIS.HOST': Joi.string().min(1).required(),
  'REDIS.PORT': JPort.required(),
  'REDIS.DB': Joi.number().integer().required(),
});
