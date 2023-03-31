import * as Joi from 'joi';
import { secretLoader, SecretConfig } from './secret.config';
import { MongoConfig, mongoLoader } from './mongo.config';

export interface EnvConfig {
  port: number;
  secrets: SecretConfig;
  mongo: MongoConfig;
}

export const loaders = [
  () => ({
    port: parseInt(process.env['PORT'], 10) || 3000,
  }),
  secretLoader,
  mongoLoader,
];

const JPort = Joi.number().integer();
const JSecret = Joi.string().min(1);

export const schema = Joi.object({
  PORT: JPort.required(),
  'SECRETS.MAIL_TOKEN': JSecret.required(),
  'MONGO.HOST': Joi.string().min(1).required(),
  'MONGO.PORT': JPort.required(),
  'MONGO.DB': Joi.string().min(1).required(),
});
