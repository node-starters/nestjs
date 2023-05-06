import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '@shared/env';
import { IUser } from '@decorators/user.decorator';
import { CacheService } from '@shared/cache';
import { ApiException } from '@api/api.exception';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(env: EnvService, private $cache: CacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.secrets.refresh_token,
    });
  }
  async validate(payload: Record<string, string>): Promise<IUser> {
    console.info(payload);
    const user: IUser = {
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
    if (await this.$cache.isTokenBlocked(user.token)) {
      ApiException.unAuthorized('Token is Expired');
    }
    return user;
  }
}
