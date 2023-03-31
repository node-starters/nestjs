import { Module } from '@nestjs/common';
import { BasicStrategy, TokenStrategy } from './guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { join } from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loaders, EnvConfig, schema } from '@config/index';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: loaders,
      validationSchema: schema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    JwtModule.registerAsync({
      async useFactory(config: ConfigService) {
        const secrets = config.get<EnvConfig['secrets']>('secrets');
        return {
          publicKey: secrets.public_key,
          privateKey: secrets.private_key,
          signOptions: { expiresIn: '60s' },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PassportModule,
    MongooseModule.forRootAsync({
      async useFactory(config: ConfigService) {
        const mongo = config.get<EnvConfig['mongo']>('mongo');
        return { uri: mongo.uri };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [BasicStrategy, TokenStrategy],
})
export class AppModule {}
