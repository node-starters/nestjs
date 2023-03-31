import { registerAs } from '@nestjs/config';

export interface AdminConfig {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export const adminLoader = registerAs('admin', () => ({
  name: process.env['ADMIN.NAME'],
  email: process.env['ADMIN.EMAIL'],
  password: process.env['ADMIN.PASSWORD'],
}));
