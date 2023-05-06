import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { passwordUtil } from '@utils/password.util';
import { HydratedDocument } from 'mongoose';

export enum AccountType {
  Admin = '1',
  User = '2',
}

@Schema({
  timestamps: true,
  autoIndex: true,
})
export class Account {
  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    validate: {
      message: 'Email is not valid',
      validator: (val: string): boolean => {
        return !!val;
      },
    },
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    required: true,
    enum: [AccountType.Admin, AccountType.User],
  })
  type!: AccountType;

  @Prop({
    type: Date,
    required: false,
  })
  blockedAt?: Date;
  @Prop({
    type: Date,
  })
  updatedAt: Date = new Date();
  @Prop({
    type: Date,
  })
  createdAt: Date = new Date();
}

export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.pre('save', function (this: Account, next) {
  passwordUtil
    .hash(this.password)
    .then((password) => {
      this.password = password;
      next();
    })
    .catch(next);
});

AccountSchema.pre('updateOne', function (next) {
  const update = this.getUpdate();
  if (!update['password']) {
    next();
  }
  passwordUtil
    .hash(update['password'])
    .then((password) => {
      this.set('password', password);
      next();
    })
    .catch(next);
});
