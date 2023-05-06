import { Message } from '@decorators/message.decorator';
import { AccessGuard } from '@guards/access';
import { BasicGuard } from '@guards/basic';
import { Body, Controller, Patch, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ForgetPasswordDto,
  ForgetPasswordResponseDto,
} from './dto/forget-password.dto';
import { PasswordService } from './password.service';
import {
  ResetPasswordDto,
  ResetPasswordResponseDto,
} from './dto/reset-password.dto';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto,
} from './dto/change-password.dto';
import { IUser, User } from '@decorators/user.decorator';
import { PasswordGuard } from '@guards/password';

@Controller('passwords')
@ApiTags('Password')
export class PasswordController {
  constructor(private $pwdService: PasswordService) {}
  @Post()
  @UseGuards(BasicGuard)
  @ApiBasicAuth()
  @Message('FORGET.SUCCESS')
  @ApiOkResponse({ type: ForgetPasswordResponseDto })
  @ApiOperation({ summary: 'Forget Password Request' })
  async forget(@Body() body: ForgetPasswordDto): Promise<boolean> {
    await this.$pwdService.forget(body.email);
    return true;
  }
  @Put()
  @UseGuards(PasswordGuard)
  @ApiBearerAuth('PasswordToken')
  @Message('RESET.SUCCESS')
  @ApiOkResponse({ type: ResetPasswordResponseDto })
  @ApiOperation({ summary: 'Reset Password' })
  async reset(
    @User() user: IUser,
    @Body() { password }: ResetPasswordDto,
  ): Promise<boolean> {
    await this.$pwdService.reset(password, user.token.id);
    return true;
  }
  @Patch()
  @UseGuards(AccessGuard)
  @ApiBearerAuth('AccessToken')
  @Message('CHANGE.SUCCESS')
  @ApiOkResponse({ type: ChangePasswordResponseDto })
  @ApiOperation({ summary: 'Change Password (After Login)' })
  async change(
    @User() user: IUser,
    @Body() { password }: ChangePasswordDto,
  ): Promise<boolean> {
    await this.$pwdService.change(password, user.id);
    return true;
  }
}
