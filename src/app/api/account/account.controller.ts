import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayload } from './account.validation';
// import { ApiBody } from '@nestjs/swagger';

@Controller('account')
export class AccountController {
  @Post('login')
  async login(@Body() payload: LoginPayload) {
    return payload.email;
  }
}
