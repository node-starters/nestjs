import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map, catchError, TimeoutError, throwError } from 'rxjs';
import { SUCCESS_MSG } from '@decorators/message.decorator';
import { Request, Response } from 'express';
import {
  DEFAULT_LANG,
  MESSAGES_DATA,
} from '@shared/language/language.constant';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(private $reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        const req: Request = context.switchToHttp().getRequest();
        const res: Response = context.switchToHttp().getResponse();
        let message = this.$reflector.get<string>(
          SUCCESS_MSG,
          context.getHandler(),
        );
        if (message) {
          console.info(res.locals[MESSAGES_DATA]);
          const multiLang = res.locals[MESSAGES_DATA][message];
          if (multiLang) {
            const lang = req.acceptsLanguages().find((lang) => multiLang[lang]);
            message = multiLang[lang || res.locals[DEFAULT_LANG]];
          }
        }
        if (!message) {
          message = 'Success';
        }
        return { statusCode: res.statusCode, message, result };
      }),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
