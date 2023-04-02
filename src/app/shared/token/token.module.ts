import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule, EnvService } from '../env';
import { TokenService } from './token.service';

@Module({
  imports: [
    EnvModule,
    JwtModule.registerAsync({
      async useFactory(config: EnvService) {
        const secrets = config.secrets;
        return {
          publicKey: secrets.public_key,
          privateKey: secrets.private_key,
          signOptions: { expiresIn: '60s' },
        };
      },
      imports: [EnvModule],
      inject: [EnvService],
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
