import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { loaders, schema } from '@config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: loaders,
      validationSchema: schema,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
