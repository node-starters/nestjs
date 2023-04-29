import { Module, forwardRef } from '@nestjs/common';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { EnvModule } from '@shared/env';
import { LoggerModule } from '@shared/logger';
import { LanguageModule } from '@shared/language';
import { resolve } from 'node:path';
import { SessionModule } from '@api/session';

@Module({
  imports: [
    EnvModule,
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
    forwardRef(() => SessionModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
