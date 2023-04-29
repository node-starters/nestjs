import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum AccountType {
  Admin = '1',
  User = '2',
}

@Schema({
  timestamps: true,
  autoIndex: true,
})
export class Session {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  accountId!: string;

  @Prop({
    type: String,
    required: true,
  })
  accountType!: AccountType;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;
}

export type SessionDocument = HydratedDocument<Session>;

export const SessionSchema = SchemaFactory.createForClass(Session);
