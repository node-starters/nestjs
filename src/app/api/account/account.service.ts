import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountType } from './account.schema';
import { Model } from 'mongoose';
import { ACCOUNT_MESSAGES } from './account.constant';
import { ApiException } from '@api/api.error';
import { EnvService } from '@shared/env';
import { TokenService } from '@shared/token';

@Injectable()
export class AccountService {
  constructor(
    private env: EnvService,
    private token: TokenService,
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
    const acc = await this.AccountModel.findOne({ email });
    if (!acc) {
      return Promise.reject(new ApiException([ACCOUNT_MESSAGES.LOGIN.INVALID]));
    }
    console.info(email, password);
    return this.token.signAuth({
      acc_id: acc._id.toHexString(),
    });
  }
}
