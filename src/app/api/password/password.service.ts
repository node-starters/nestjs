import { AccountService } from '@api/account';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Password, PasswordMethod } from './password.schema';
import { Model, Types } from 'mongoose';
import { ApiException } from '@api/api.exception';
import { TokenService } from '@shared/token';

@Injectable()
export class PasswordService {
  constructor(
    private $tokenService: TokenService,
    private $accountService: AccountService,
    @InjectModel(Password.name) private $PasswordModel: Model<Password>,
  ) {}
  async forget(email: string): Promise<void> {
    const account = await this.$accountService.findByEmail(email);
    if (!account) {
      ApiException.badData('FORGET.NO_ACCOUNT');
    }
    if (account.blockedAt) {
      ApiException.badData('FORGET.BLOCKED_ACCOUNT');
    }
    const req = await this.$PasswordModel.create({
      accountId: account._id,
      method: PasswordMethod.Reset,
    });
    const token = this.$tokenService.genPasswordToken({
      tid: req._id.toHexString(),
    });
    console.info(token);
  }
  async reset(password: string, requestId: string): Promise<void> {
    const req = await this.$PasswordModel.findById(requestId, {
      accountId: 1,
      oldPassword: 1,
    });
    if (!req) {
      ApiException.badData('RESET.NO_REQUEST');
    } else if (req.oldPassword) {
      ApiException.badData('RESET.ALREADY');
    }
    const oldPassword = await this.$accountService.changePassword(
      password,
      req.accountId.toHexString(),
    );
    if (!oldPassword) {
      ApiException.badData('RESET.NO_ACCOUNT');
    }
    await this.$PasswordModel.updateOne(
      {
        _id: new Types.ObjectId(requestId),
      },
      { oldPassword },
    );
  }
  async change(password: string, accountId: string): Promise<void> {
    const oldPassword = await this.$accountService.changePassword(
      password,
      accountId,
    );
    if (!oldPassword) {
      ApiException.badData('CHANGE.NO_ACCOUNT');
    }
    await this.$PasswordModel.create({
      accountId,
      oldPassword,
      method: PasswordMethod.Change,
    });
  }
}
