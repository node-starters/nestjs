import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './api.interceptor';
import { AccountModule } from './account/account.module';
import { LanguageModule } from '@shared/language';
import { resolve } from 'node:path';

@Module({
  imports: [
    AccountModule,
    LanguageModule.forRoot({
      path: resolve(__dirname, 'api.message.json'),
    }),
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
