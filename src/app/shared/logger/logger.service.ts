import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { CONTEXT_CONFIG } from './logger.constant';

@Injectable()
export class AppLogger extends ConsoleLogger {
  constructor(@Inject(CONTEXT_CONFIG) context: string) {
    super(context);
    // this.
  }
}
