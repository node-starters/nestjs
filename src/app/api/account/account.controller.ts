import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  ProfileResult,
} from './account.dto';
import { BasicGuard, BearerGuard } from '@guards/index';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { Message } from '@decorators/message.decorator';
import { IUser, User } from '@decorators/user.decorator';
import { ErrorResponse } from '@api/api.dto';

@Controller('accounts')
@ApiUnprocessableEntityResponse({
  type: ErrorResponse,
})
export class AccountController {
  constructor(public accountService: AccountService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  @ApiBody({ type: LoginPayload })
  @ApiBasicAuth()
  @Message('LOGIN.SUCCESS')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() payload: LoginPayload): Promise<string> {
    const token = await this.accountService.login(
      payload.email,
      payload.password,
    );
    return token;
  }
  @Get('profile')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @Message('SUCCESS')
  @ApiOkResponse({ type: ProfileResponse })
  async profile(@User() user: IUser): Promise<ProfileResult> {
    return await this.accountService.profile(user.id);
  }
}
