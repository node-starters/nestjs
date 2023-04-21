import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BasicStrategy, BearerStrategy } from './guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { join } from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule, EnvService } from './shared/env';
import { TokenModule } from './shared/token';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { LoggerModule } from './shared/logger/logger.module';
import * as MIDDLEWARE from './middleware';

@Module({
  imports: [
    EnvModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    TokenModule,
    PassportModule,
    MongooseModule.forRootAsync({
      async useFactory(env: EnvService) {
        return { uri: env.mongo.uri };
      },
      imports: [EnvModule],
      inject: [EnvService],
    }),
    ApiModule,
    LoggerModule.forRoot({
      context: AppModule.name,
    }),
  ],
  controllers: [AppController],
  providers: [
    BasicStrategy,
    BearerStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...Object.values(MIDDLEWARE)).forRoutes('*');
  }
}
