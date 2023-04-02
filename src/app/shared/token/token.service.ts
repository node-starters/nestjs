import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { EnvService } from '@shared/env';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {
    // console.info(jwt);
  }
  signAuth(payload: object): string {
    return this.jwt.sign(payload, {
      algorithm: 'RS256',
    });
  }
}
