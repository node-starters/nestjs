import { Types } from 'mongoose';
import { AccountType } from '../session.schema';

export class CreateDto {
  account_id: Types.ObjectId;
  account_type: AccountType;
}
