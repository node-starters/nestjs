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

const JPort = Joi.number().integer();
const JSecret = Joi.string().min(1);

export const schema = Joi.object({
  PORT: JPort.required(),
  'SECRETS.MAIL_TOKEN': JSecret.required(),
});
