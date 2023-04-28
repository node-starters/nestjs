import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DEFAULT_LANG, MESSAGES_DATA } from './language.constant';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(
    @Inject(MESSAGES_DATA) public messages: Record<string, unknown>,
    @Inject(DEFAULT_LANG) public language: string,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.locals[DEFAULT_LANG] = this.language;
    if (!res.locals[MESSAGES_DATA]) {
      res.locals[MESSAGES_DATA] = {};
    }
    res.locals[MESSAGES_DATA] = {
      ...res.locals[MESSAGES_DATA],
      ...this.messages,
    };
    return next();
  }
}
