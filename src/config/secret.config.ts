import { registerAs } from '@nestjs/config';

export interface SecretConfig {
  auth: string;
}

export const secretLoader = registerAs('secrets', () => ({
  auth: process.env['SECRETS.AUTH'],
}));
