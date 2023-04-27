import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { EnvService } from '@shared/env';
import { AppLogger } from '@shared/logger';
import { SocketAdapter } from './app/socket/socket.adapter';
import helmet from 'helmet';

class Server {
  static async bootstrap(): Promise<Server> {
    const app = await NestFactory.create(AppModule);
    const adapter = new SocketAdapter(app);
    await adapter.connectToRedis();
    app.useWebSocketAdapter(adapter);
    const server = new Server(app);
    server.setupSwagger();
    return server;
  }
  readonly #env = this.app.get(EnvService);
  readonly #logger = this.app.get(AppLogger);
  constructor(public app: INestApplication) {
    app.use(helmet());
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          const error = errors[0];
          return new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Bad Request',
              errors: Object.values(error.constraints),
            },
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    );
  }
  setupSwagger() {
    const builder = new DocumentBuilder()
      .setTitle('My Application')
      .setDescription('My Application Service')
      .setVersion('1.0')
      .addBearerAuth()
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, builder);
    SwaggerModule.setup('api', this.app, document, {
      customSiteTitle: 'Docs | My Application',
    });
  }
  async start() {
    try {
      const port = this.#env.port;
      await this.app.listen(port);
      this.#logger.log(`Server running on ${port}`);
    } catch (err) {
      this.#logger.error(err.message, err.stack);
    }
  }
}

Server.bootstrap()
  .then(async (server) => {
    await server.start();
  })
  .catch(() => {
    // Do Nothing
  });
