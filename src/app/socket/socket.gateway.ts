import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppLogger } from '@shared/logger';
import { Server, Socket } from 'socket.io';
import { extractFromAuthorization, validateAuth } from './socket.auth';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private logger: AppLogger) {}
  afterInit(server: Server) {
    server.use(validateAuth(extractFromAuthorization));
  }
  handleConnection(client: Socket) {
    this.logger.log(`New Client(${client.id})`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client(${client.id}) Disconnected`);
  }
  @SubscribeMessage('ping')
  ping(@MessageBody() data: unknown) {
    this.logger.log(data);
    return { message: 'Success' };
  }
}
