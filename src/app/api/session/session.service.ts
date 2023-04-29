import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model } from 'mongoose';
import { AppLogger } from '@shared/logger';
import { TokenService } from '@shared/token';

@Injectable()
export class SessionService {
  constructor(
    private logger: AppLogger,
    private tokenService: TokenService,
    @InjectModel(Session.name) private SessionModel: Model<Session>,
  ) {}
  async create(data: CreateDto): Promise<string> {
    const session = await this.SessionModel.create({
      account_id: data.account_id,
      account_type: data.account_type,
    });
    return this.tokenService.signAuth({
      session_id: session._id.toHexString(),
      account_id: data.account_id.toHexString(),
      account_type: data.account_type,
    });
  }

  async logout(sessionId: string, userId: string): Promise<void> {
    this.logger.log(sessionId);
    this.logger.log(userId);
  }
}
