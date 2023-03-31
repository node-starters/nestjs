import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

class Server {
  static async bootstrap(): Promise<Server> {
    const app = await NestFactory.create(AppModule);

    const server = new Server(app);
    server.setupSwagger();
    return server;
  }
  readonly #config = this.app.get(ConfigService);
  constructor(public app: INestApplication) {
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());
  }
  setupSwagger() {
    const builder = new DocumentBuilder()
      .setTitle('My Application')
      .setDescription('My Application Service')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, builder);
    SwaggerModule.setup('api', this.app, document, {
      customSiteTitle: 'Docs | My Application',
    });
  }
  async start() {
    const port = this.#config.get<number>('port');
    await this.app.listen(port);
    console.info(`Server running on ${port}`);
  }
}

Server.bootstrap()
  .then(async (server) => {
    await server.start();
  })
  .catch((err) => {
    console.error(err);
  });
