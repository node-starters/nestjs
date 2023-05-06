import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface IToken {
  id: string;
  issuedAt: Date;
  expiredAt: Date;
  audience: string;
  subject: string;
  issuer: string;
}

export interface IUser {
  id: string;
  type: string;
  token: IToken;
}
