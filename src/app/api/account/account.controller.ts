import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginPayload, ProfileResult } from './account.validation';
import { BasicGuard, BearerGuard } from '@guards/index';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { Message } from '@decorators/message.decorator';
import { IUser, User } from '@decorators/user.decorator';
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
    return token;
  }
  @Get('profile')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @Message(ACCOUNT_MESSAGES.SUCCESS)
  @ApiResponse({ type: ProfileResult })
  async profile(@User() user: IUser): Promise<ProfileResult> {
    return await this.accountService.profile(user.id);
  }
}
