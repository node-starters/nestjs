import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { BasicStrategy, TokenStrategy } from './guards';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [BasicStrategy, TokenStrategy],
})
export class AppModule {}
