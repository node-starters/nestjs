import { registerAs } from '@nestjs/config';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface SecretConfig {
  mail_token: string;
  public_key: string;
  private_key: string;
}

export const secretLoader = registerAs('secrets', () => ({
  mail_token: process.env['SECRETS.MAIL_TOKEN'],
  public_key: readFileSync(
    resolve(__dirname, '../../secrets/jwt-public.pem'),
    'utf8',
  ),
  private_key: readFileSync(
    resolve(__dirname, '../../secrets/jwt-private.pem'),
    'utf8',
  ),
}));
