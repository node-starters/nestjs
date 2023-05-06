import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '@shared/env';
import { IUser } from '@decorators/user.decorator';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.secrets.password_token,
    });
  }
  async validate(payload: Record<string, string>): Promise<IUser> {
    console.info(payload);
    return {
      id: payload.aid,
      type: payload.typ,
      token: {
        id: payload.tid,
        issuedAt: new Date(parseInt(payload.iat.toString()) * 1000),
        expiredAt: new Date(parseInt(payload.exp.toString()) * 1000),
        audience: payload.aud,
        subject: payload.sub,
        issuer: payload.iss,
      },
    };
  }
}
