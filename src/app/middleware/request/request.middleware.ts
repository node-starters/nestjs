import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from '@shared/logger';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(public logger: AppLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    res.on('finish', () => {
      const color =
        res.statusCode >= 500
          ? 31 // red
          : res.statusCode >= 400
          ? 33 // yellow
          : res.statusCode >= 300
          ? 36 // cyan
          : res.statusCode >= 200
          ? 32 // green
          : 0; // no color

      this.logger.log(
        `${req.method} ${req.url} \x1b[${color}m${res.statusCode}\x1b[0m - ${
          Date.now() - startTime
        } ms`,
      );
    });
    next();
  }
}
