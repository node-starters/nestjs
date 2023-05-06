import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { IUser, User } from '@decorators/user.decorator';
import { Message } from '@decorators/message.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RefreshGuard } from '@guards/refresh';
import { ErrorResponseDto } from '@api/api.dto';
import { LogoutResponseDto } from './dto/logout.dto';

@Controller('sessions')
@ApiUnprocessableEntityResponse({
  type: ErrorResponseDto,
})
@ApiTags('Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete('/logout')
  @UseGuards(RefreshGuard)
  @ApiBearerAuth('RefreshToken')
  @Message('LOGOUT.SUCCESS')
  @ApiOkResponse({ type: LogoutResponseDto })
  @ApiOperation({ summary: 'Logout Session' })
  async logout(@User() user: IUser): Promise<void> {
    await this.sessionService.logout(user.token);
  }
  @Get('/refresh')
  @UseGuards(RefreshGuard)
  @ApiBearerAuth('RefreshToken')
  @Message('REFRESH.SUCCESS')
  @ApiOkResponse({ type: LogoutResponseDto })
  @ApiOperation({ summary: 'Regenerate access token by refresh token' })
  async refresh(@User() user: IUser): Promise<string> {
    return await this.sessionService.refresh(user);
  }
}
