import { SetMetadata } from '@nestjs/common';

export const SUCCESS_MSG = 'SUCCESS_MSG';

export const Message = (msg: string) => SetMetadata(SUCCESS_MSG, msg);
