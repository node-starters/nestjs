import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  validate(username: string, password: string) {
    return username === 'RCC_USR' && password === 'RCC_PWD';
  }
}
