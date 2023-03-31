import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    required: true,
  })
  type!: AccountType;

  @Prop({
    required: false,
  })
  blockedAt: Date;
}

export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);
