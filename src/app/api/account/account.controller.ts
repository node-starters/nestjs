import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginPayloadDto, LoginResponseDto } from './dto/login.dto';
import { ProfileResultDto, ProfileResponseDto } from './dto/profile.dto';
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
import { ErrorResponseDto } from '@api/api.dto';

@Controller('accounts')
@ApiUnprocessableEntityResponse({
  type: ErrorResponseDto,
})
export class AccountController {
  constructor(public accountService: AccountService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  @ApiBody({ type: LoginPayloadDto })
  @ApiBasicAuth()
  @Message('LOGIN.SUCCESS')
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Body() payload: LoginPayloadDto): Promise<string> {
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
  @ApiOkResponse({ type: ProfileResponseDto })
  async profile(@User() user: IUser): Promise<ProfileResultDto> {
    return await this.accountService.profile(user.account_id);
  }
}
