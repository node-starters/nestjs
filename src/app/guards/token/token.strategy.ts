import { EnvConfig } from '@config/index';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<EnvConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<EnvConfig['secrets']>('secrets').public_key,
    });
  }
  validate(payload: unknown) {
    console.info(payload);
    return true;
  }
}
