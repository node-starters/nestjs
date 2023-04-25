import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppLogger } from '@shared/logger';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private logger: AppLogger) {}
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    this.logger.log(data);
    return {};
  }
}
