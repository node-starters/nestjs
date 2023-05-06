import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { EnvService } from '@shared/env';

@Injectable()
export class TokenService {
  readonly #ISSUER = 'APPINVENTIV';
  readonly #AUDIENCE = 'https://api.example.com';
  constructor(private $jwt: JwtService, private $env: EnvService) {
    // console.info(jwt);
  }
  genToken(payload: object, options: JwtSignOptions = {}): string {
    return this.$jwt.sign(payload, {
      audience: this.#AUDIENCE,
      issuer: this.#ISSUER,
      ...options,
    });
  }
  genAccessToken(payload: Record<string, unknown>) {
    return this.genToken(payload, {
      algorithm: 'RS256',
      expiresIn: 300, // 5 minutes
      subject: 'access',
    });
  }
  genRefreshToken(payload: Record<string, unknown>) {
    return this.genToken(payload, {
      algorithm: 'HS256',
      expiresIn: '7d',
      subject: 'refresh',
      secret: this.$env.secrets.refresh_token,
    });
  }
  genPasswordToken(payload: Record<string, unknown>) {
    return this.genToken(payload, {
      algorithm: 'HS256',
      expiresIn: '7d',
      subject: 'refresh',
      secret: this.$env.secrets.refresh_token,
    });
  }
}
