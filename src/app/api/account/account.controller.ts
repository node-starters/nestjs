import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginPayload } from './account.validation';
import { BasicGuard } from '@guards/basic';
import { ApiBasicAuth, ApiBody } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { Message } from '@decorators/message.decorator';
import { ACCOUNT_MESSAGES } from './account.constant';

@Controller('account')
export class AccountController {
  constructor(public accountService: AccountService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  @ApiBody({ type: LoginPayload })
  @ApiBasicAuth()
  @Message(ACCOUNT_MESSAGES.LOGIN.SUCCESS)
  async login(@Body() payload: LoginPayload) {
    const token = await this.accountService.login(
      payload.email,
      payload.password,
    );
    console.info(token);
    return token;
  }
}
