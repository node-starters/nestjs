import { Get, Controller } from '@nestjs/common';
import { Message } from '@decorators/message.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller({
  version: '1',
})
export class ApiController {
  @Get()
  @Message('API is working fine !')
  @ApiExcludeEndpoint()
  ping() {
    return null;
  }
}
