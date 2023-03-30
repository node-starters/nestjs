import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { BasicStrategy, TokenStrategy } from './guards';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from '@services/env';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [EnvService, BasicStrategy, TokenStrategy],
})
export class AppModule {}
