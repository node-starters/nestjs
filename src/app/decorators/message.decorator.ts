import { SetMetadata } from '@nestjs/common';

export const SUCCESS_MSG = Symbol.for('SUCCESS_MSG');

export const Message = (msg: string) => SetMetadata(SUCCESS_MSG, msg);
