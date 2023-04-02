import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '@shared/env';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.secrets.public_key,
    });
  }
  validate(payload: unknown) {
    console.info(payload);
    return true;
  }
}
