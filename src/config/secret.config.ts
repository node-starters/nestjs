import { registerAs } from '@nestjs/config';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface SecretConfig {
  password_token: string;
  refresh_token: string;
  private_key: string;
  public_key: string;
}

export const secretLoader = registerAs('secrets', () => ({
  password_token: process.env['SECRETS.PASSWORD_TOKEN'],
  refresh_token: process.env['SECRETS.REFRESH_TOKEN'],
  public_key: readFileSync(
    resolve(__dirname, '../../secrets/jwt-public.pem'),
    'utf8',
  ),
  private_key: readFileSync(
    resolve(__dirname, '../../secrets/jwt-private.pem'),
    'utf8',
  ),
}));
