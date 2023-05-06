import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiController } from './api.controller';
import { ApiInterceptor } from './api.interceptor';
import { AccountModule } from './account/account.module';
import { LanguageModule } from '@shared/language';
import { SessionModule } from './session/session.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    AccountModule,
    LanguageModule.forRoot({
      path: resolve(__dirname, 'api.message.json'),
    }),
    SessionModule,
    PasswordModule,
  ],
  controllers: [ApiController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})
export class ApiModule {}
