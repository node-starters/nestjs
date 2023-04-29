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
  account_id!: string;

  @Prop({
    type: String,
    required: true,
  })
  account_type!: AccountType;

  @Prop({
    type: Boolean,
    default: true,
  })
  is_active!: boolean;
}

export type SessionDocument = HydratedDocument<Session>;

export const SessionSchema = SchemaFactory.createForClass(Session);
