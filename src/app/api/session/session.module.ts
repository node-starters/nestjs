import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { LoggerModule } from '@shared/logger';
import { LanguageModule } from '@shared/language';
import { TokenModule } from '@shared/token';
import { resolve } from 'node:path';
import { AccountModule } from '@api/account';

@Module({
  imports: [
    TokenModule,
    LoggerModule.forChild({
      context: SessionModule.name,
    }),
    LanguageModule.forFeature({
      path: resolve(__dirname, 'session.message.json'),
    }),
    forwardRef(() => AccountModule),
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
