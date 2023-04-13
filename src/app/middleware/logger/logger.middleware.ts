import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, url } = req;
    res.on('finish', () => {
      console.info(
        `\n[REQUEST] ${method} ${url} ${res.statusCode} ${
          Date.now() - startTime
        }ms`,
      );
    });
    next();
  }
}
