import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountType } from './account.schema';
import { Model } from 'mongoose';
import { ApiException } from '@api/api.exception';
import { EnvService } from '@shared/env';
import { passwordUtil } from '@utils/password.util';
import { AppLogger } from '@shared/logger';
import { SessionService } from '@api/session';

@Injectable()
export class AccountService {
  constructor(
    private env: EnvService,
    private logger: AppLogger,
    @Inject(forwardRef(() => SessionService))
    private sessionService: SessionService,
    @InjectModel(Account.name) private AccountModel: Model<Account>,
  ) {
    this.bootstrap().catch(console.error);
  }
  async bootstrap() {
    const admin = this.env.admin;
    const acc = await this.AccountModel.findOne(
      {
        email: admin.email,
      },
      { _id: 1 },
    );
    if (!acc) {
      await this.AccountModel.create({
        name: admin.name,
        email: admin.email,
        password: admin.password,
        type: AccountType.Admin,
      });
    }
  }
  async login(email: string, password: string) {
    const acc = await this.AccountModel.findOne(
      { email },
      {
        _id: 1,
        type: 1,
        password: 1,
      },
    );
    if (!acc) {
      ApiException.badData('LOGIN.INVALID');
    }
    if (!(await passwordUtil.compare(password, acc.password))) {
      ApiException.badData('LOGIN.INVALID');
    }
    return this.sessionService.create({
      id: acc._id.toHexString(),
      type: acc.type,
    });
  }
  async profile(id: string) {
    const result = await this.AccountModel.findById(id, {
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return result.toJSON();
  }
}
