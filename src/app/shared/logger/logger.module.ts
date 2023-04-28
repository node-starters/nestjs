import { DynamicModule, Module } from '@nestjs/common';
import { ChildOptions, RootOptions } from './logger';
import { AppLogger } from './logger.service';
import { CONTEXT_CONFIG } from './logger.constant';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {
  static forRoot(options: RootOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [{ provide: CONTEXT_CONFIG, useValue: options.context }],
      exports: [],
    };
  }
  static forChild(options: ChildOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [{ provide: CONTEXT_CONFIG, useValue: options.context }],
      exports: [],
    };
  }
}
