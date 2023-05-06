import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { RedisConfig } from '@config/redis.config';
import { AppLogger } from '@shared/logger';

export class SocketAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  constructor(app: unknown, public logger: AppLogger) {
    super(app);
  }
  #createClient(config: RedisConfig, label: string) {
    const client = createClient({ url: config.uri, database: config.db });
    client.on('connect', () => {
      this.logger.log(`{${label}} Connected`, 'SocketAdapter');
    });
    client.on('error', (err: Error) => {
      this.logger.error(
        `{${label}} ${err.message}`,
        err.stack,
        'SocketAdapter',
      );
    });
    return client;
  }
  async connectToRedis(config: RedisConfig): Promise<void> {
    const pubClient = this.#createClient(config, 'Publisher');
    const subClient = this.#createClient(config, 'Subscriber');
    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
