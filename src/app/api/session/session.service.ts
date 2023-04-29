import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model, Types } from 'mongoose';
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
      accountId: data.accountId,
      accountType: data.accountType,
    });
    return this.tokenService.signAuth({
      sessionId: session._id.toHexString(),
      accountId: data.accountId.toHexString(),
      accountType: data.accountType,
    });
  }

  async logout(sessionId: string, accountId: string): Promise<void> {
    await this.SessionModel.updateOne(
      { isActive: false },
      {
        _id: new Types.ObjectId(sessionId),
        accountId: new Types.ObjectId(accountId),
      },
    );
  }
}
