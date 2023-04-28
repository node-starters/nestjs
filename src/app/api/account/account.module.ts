import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { EnvModule } from '@shared/env';
import { TokenModule } from '@shared/token';
import { LoggerModule } from '@shared/logger';
import { LanguageModule } from '@shared/language';
import { resolve } from 'node:path';

@Module({
  imports: [
    EnvModule,
    TokenModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    LoggerModule.forChild({
      context: AccountModule.name,
    }),
    LanguageModule.forFeature({
      path: resolve(__dirname, 'account.message.json'),
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
