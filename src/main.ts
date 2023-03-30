import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

class Server {
  static async bootstrap(): Promise<Server> {
    const app = await NestFactory.create(AppModule);
    const server = new Server(app);
    server.configSwagger();
    return server;
  }
  constructor(public app: INestApplication) {
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());
  }
  configSwagger() {
    const config = new DocumentBuilder()
      .setTitle('My Application')
      .setDescription('My Application Service')
      .setVersion('1.0')
      .addTag('api')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document, {
      customSiteTitle: 'Docs | My Application',
    });
  }
  async start() {
    this.app.listen(3000);
    console.info(`Server running on ${3000}`);
  }
}

Server.bootstrap()
  .then(async (server) => {
    await server.start();
  })
  .catch((err) => {
    console.error(err);
  });
