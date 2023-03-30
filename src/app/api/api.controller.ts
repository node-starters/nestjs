import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { ApiInterceptor } from './api.interceptor';
import { Message } from '@decorators/message.decorator';

@Controller({
  version: '1',
})
@UseInterceptors(ApiInterceptor)
export class ApiController {
  @Get()
  @Message('API is working fine !')
  ping() {
    return null;
  }
}
