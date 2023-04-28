import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  DEFAULT_LANG,
  LanguageConfig,
  MESSAGES_DATA,
} from './language.constant';
import { LanguageInterceptor } from './language.interceptor';
import { readFileSync } from 'node:fs';
import { LanguageMiddleware } from './language.middleware';

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(
    readFileSync(path, {
      encoding: 'utf8',
    }),
  );
}

@Module({})
export class LanguageModule {
  static forRoot(config: LanguageConfig): DynamicModule {
    const messages = readJson(config.path);
    return {
      module: LanguageModule,
      providers: [
        {
          provide: MESSAGES_DATA,
          useValue: messages,
        },
        {
          provide: DEFAULT_LANG,
          useValue: config.default || LanguageConfig.default,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: LanguageInterceptor,
        },
      ],
    };
  }
  static forFeature(config: LanguageConfig): DynamicModule {
    const messages = readJson(config.path);
    return {
      module: LanguageModule,
      providers: [
        {
          provide: MESSAGES_DATA,
          useValue: messages,
        },
        {
          provide: DEFAULT_LANG,
          useValue: config.default || LanguageConfig.default,
        },
      ],
    };
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
}
