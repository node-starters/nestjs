import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountType } from './account.schema';
import { Model } from 'mongoose';
import { ApiException } from '@api/api.error';
import { EnvService } from '@shared/env';
import { TokenService } from '@shared/token';
import { passwordUtil } from '@utils/password.util';
import { AppLogger } from '@shared/logger';

@Injectable()
export class AccountService {
  constructor(
    private env: EnvService,
    private token: TokenService,
    private logger: AppLogger,
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
        password: 1,
      },
    );
    if (!acc) {
      ApiException.throw('LOGIN.INVALID');
    }
    if (!(await passwordUtil.compare(password, acc.password))) {
      ApiException.throw('LOGIN.INVALID');
    }
    return this.token.signAuth({
      acc_id: acc._id.toHexString(),
    });
  }
  async profile(id: string) {
    const result = await this.AccountModel.findById(id);
    return result.toJSON();
  }
}
