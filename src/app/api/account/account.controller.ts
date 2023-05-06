import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  LoginPayloadDto,
  LoginResponseDto,
  LoginResultDto,
} from './dto/login.dto';
import { ProfileResultDto, ProfileResponseDto } from './dto/profile.dto';
import { BasicGuard, AccessGuard } from '@guards/index';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
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
@ApiTags('Account')
export class AccountController {
  constructor(public accountService: AccountService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  @ApiBasicAuth()
  @Message('LOGIN.SUCCESS')
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiOperation({ summary: 'Login with email & password' })
  async login(@Body() payload: LoginPayloadDto): Promise<LoginResultDto> {
    const result = await this.accountService.login(
      payload.email,
      payload.password,
    );
    return LoginResultDto.parse(result);
  }
  @Get('profile')
  @UseGuards(AccessGuard)
  @ApiBearerAuth('AccessToken')
  @Message('SUCCESS')
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiOperation({ summary: 'Fetch profile details' })
  async profile(@User() user: IUser): Promise<ProfileResultDto> {
    const result = await this.accountService.profile(user.id);
    return ProfileResultDto.parse(result);
  }
}
