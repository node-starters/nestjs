import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './session.schema';
import { LoggerModule } from '@shared/logger';
import { LanguageModule } from '@shared/language';
import { TokenModule } from '@shared/token';
import { resolve } from 'node:path';
import { AccountModule } from '@api/account';

@Module({
  imports: [
    TokenModule,
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
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
