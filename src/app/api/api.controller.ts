import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { ApiInterceptor } from './api.interceptor';
import { Message } from '@decorators/message.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller({
  version: '1',
})
@UseInterceptors(ApiInterceptor)
export class ApiController {
  @Get()
  @Message('API is working fine !')
  @ApiExcludeEndpoint()
  ping() {
    return null;
  }
}
