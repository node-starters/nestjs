import { Module } from '@nestjs/common';
import { BasicStrategy, BearerStrategy } from './guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { join } from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule, EnvService } from './shared/env';
import { TokenModule } from './shared/token';

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
  ],
  controllers: [AppController],
  providers: [BasicStrategy, BearerStrategy],
})
export class AppModule {}
