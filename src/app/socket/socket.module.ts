import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { LoggerModule } from '@shared/logger';

@Module({
  providers: [SocketGateway],
  imports: [
    LoggerModule.forChild({
      context: 'Socket',
    }),
  ],
})
export class SocketModule {}
