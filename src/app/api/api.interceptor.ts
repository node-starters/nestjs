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

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(private $reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        console.info(result);
        let message = this.$reflector.get<string>(
          SUCCESS_MSG,
          context.getHandler(),
        );
        if (!message) {
          message = 'Success';
        }
        return { statusCode: 200, message, result };
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
