import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountType } from './account.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '@config/index';

@Injectable()
export class AccountService {
  constructor(
    private config: ConfigService<EnvConfig>,
    @InjectModel(Account.name) private AccountModel: Model<Account>,
  ) {
    this.bootstrap().catch(console.error);
  }
  async bootstrap() {
    const admin = this.config.get<EnvConfig['admin']>('admin');
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
    console.info(email, password);
  }
}
