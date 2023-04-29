import { Types } from 'mongoose';
import { AccountType } from '../session.schema';

export class CreateDto {
  accountId: Types.ObjectId;
  accountType: AccountType;
}
