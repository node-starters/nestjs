import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { EnvService } from '@shared/env';
import { AppLogger } from '@shared/logger';
import { IToken } from '@decorators/user.decorator';

@Injectable()
export class CacheService {
  readonly #client = createClient({
    url: this.$env.redis.uri,
    database: 0,
  });
  constructor(private $env: EnvService, private $logger: AppLogger) {}
  async blockToken(token: IToken): Promise<void> {
    const key = `EXPIRED_TOKEN_${token.id}`;
    await this.#client.SET(key, 1);
    const ttl = Math.floor((token.expiredAt.getTime() - Date.now()) / 1000);
    await this.#client.expire(key, ttl);
  }
  async isTokenBlocked(token: IToken): Promise<boolean> {
    const result = await this.#client.GET(`EXPIRED_TOKEN_${token.id}`);
    return !!parseInt(result, 10);
  }
  async connect() {
    this.$logger.log('{Redis} Connecting ....');
    await this.#client.connect();
    this.$logger.log('{Redis} Connected !');
  }
  async disconnect() {
    this.$logger.log('{Redis} Disconnecting ....');
    await this.#client.disconnect();
    this.$logger.log('{Redis} Disconnected !');
  }
}
