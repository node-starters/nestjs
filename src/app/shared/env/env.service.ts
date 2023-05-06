import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '@config/index';

@Injectable()
export class EnvService {
  readonly port = this.config.get<number>('port');
  readonly mongo = this.config.get<EnvConfig['mongo']>('mongo');
  readonly admin = this.config.get<EnvConfig['admin']>('admin');
  readonly secrets = this.config.get<EnvConfig['secrets']>('secrets');
  readonly redis = this.config.get<EnvConfig['redis']>('redis');
  constructor(private config: ConfigService<EnvConfig, true>) {}
  get<Key extends keyof EnvConfig>(key: Key): EnvConfig[Key] {
    return this.config.get(key);
  }
}
