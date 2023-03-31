import * as Joi from 'joi';
import { secretLoader, SecretConfig } from './secret.config';

export interface EnvConfig {
  port: number;
  secrets: SecretConfig;
}

export const loaders = [
  () => ({
    port: parseInt(process.env['PORT'], 10) || 3000,
  }),
  secretLoader,
];

export const schema = Joi.object({
  PORT: Joi.number().integer().required(),
  'SECRETS.AUTH': Joi.string().min(1).required(),
});
