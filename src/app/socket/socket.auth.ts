import { Socket } from 'socket.io';
import { NextFunction } from 'express';
import { WsException } from '@nestjs/websockets';

export function extractFromAuthorization(socket: Socket): string | null {
  const auth = socket.handshake.headers.authorization;
  if (!auth) {
    return null;
  }
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer') {
    return null;
  }
  return token;
}

export function validateAuth(
  tokenExtractor: (socket: Socket) => string | null,
) {
  return (socket: Socket, next: NextFunction): void => {
    const token = tokenExtractor(socket);
    if (!token) {
      next(new WsException('Authorization required'));
    }
    // @TODO Handle Token
    next();
  };
}
