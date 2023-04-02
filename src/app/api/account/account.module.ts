import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { EnvModule } from '@shared/env';
import { TokenModule } from '@shared/token';

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
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
