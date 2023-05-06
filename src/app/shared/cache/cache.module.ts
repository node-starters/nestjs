import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CacheService } from './cache.service';
import { EnvModule } from '@shared/env';
import { LoggerModule } from '@shared/logger';

@Module({
  imports: [
    EnvModule,
    LoggerModule.forChild({
      context: CacheModule.name,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
@Global()
export class CacheModule implements OnApplicationBootstrap {
  constructor(private $cacheService: CacheService) {}
  async onApplicationBootstrap() {
    await this.$cacheService.connect();
  }
}
