import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '@shared/env';
import { IUser } from '@decorators/user.decorator';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: env.secrets.public_key,
    });
  }
  validate(payload: unknown): IUser | null {
    console.info(payload);
    return { id: payload['acc_id'] };
  }
}
