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
import { DEFAULT_LANG, MESSAGES_DATA } from '@shared/language';
import { ApiException } from './api.exception';
import { validateSync } from 'class-validator';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(private $reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((result) => {
        if (result && typeof result === 'object') {
          const errors = validateSync(result);
          if (errors?.length) {
            ApiException.badImplementation(
              ...errors.flatMap((err) => Object.values(err.constraints)),
            );
          }
        }
        return result;
      }),
      map((result) => {
        const res: Response = context.switchToHttp().getResponse();
        let message = this.$reflector.get<string>(
          SUCCESS_MSG,
          context.getHandler(),
        );
        message = this.#extractMessage(req, res, message);
        if (!message) {
          message = 'Success';
        }
        return { statusCode: res.statusCode, message, result: result ?? null };
      }),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        } else if (err instanceof ApiException) {
          const res = context.switchToHttp().getResponse();
          err.message = this.#extractMessage(req, res, err.message);
          const result = err.getResponse();
          result.message = this.#extractMessage(req, res, result.message);
          result.reasons.forEach((err) => {
            err.reason = this.#extractMessage(req, res, err.reason);
          });
          return throwError(() => err);
        }
        return throwError(() => err);
      }),
    );
  }
  #extractMessage(req: Request, res: Response, message: string) {
    if (!message) {
      return message;
    }
    const multiLang = res.locals[MESSAGES_DATA][message];
    if (!multiLang) {
      return message;
    }
    const lang = req.acceptsLanguages().find((lang) => multiLang[lang]);
    return multiLang[lang || res.locals[DEFAULT_LANG]];
  }
}
