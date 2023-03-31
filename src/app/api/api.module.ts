import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './api.interceptor';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [ApiController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})
export class ApiModule {}
