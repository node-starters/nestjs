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

class Server {
  static async bootstrap(): Promise<Server> {
    const app = await NestFactory.create(AppModule);

    const server = new Server(app);
    server.setupSwagger();
    return server;
  }
  readonly #env = this.app.get(EnvService);
  constructor(public app: INestApplication) {
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
    const port = this.#env.port;
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
