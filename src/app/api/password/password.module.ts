import { resolve } from 'node:path';
import { Module, forwardRef } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { AccountModule } from '@api/account';
import { TokenModule } from '@shared/token';
import { LoggerModule } from '@shared/logger';
import { LanguageModule } from '@shared/language';
import { MongooseModule } from '@nestjs/mongoose';
import { Password, PasswordSchema } from './password.schema';

@Module({
  imports: [
    TokenModule,
    LoggerModule.forChild({
      context: PasswordModule.name,
    }),
    LanguageModule.forFeature({
      path: resolve(__dirname, 'password.message.json'),
    }),
    forwardRef(() => AccountModule),
    MongooseModule.forFeature([
      {
        name: Password.name,
        schema: PasswordSchema,
      },
    ]),
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
