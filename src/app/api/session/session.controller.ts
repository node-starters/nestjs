import { Controller, Delete, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { IUser, User } from '@decorators/user.decorator';
import { Message } from '@decorators/message.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { BearerGuard } from '@guards/bearer';
import { ErrorResponseDto } from '@api/api.dto';
import { LogoutResponseDto } from './dto/logout.dto';

@Controller('sessions')
@ApiUnprocessableEntityResponse({
  type: ErrorResponseDto,
})
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete()
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @Message('LOGOUT.SUCCESS')
  @ApiOkResponse({ type: LogoutResponseDto })
  async logout(@User() user: IUser): Promise<void> {
    await this.sessionService.logout(user.session_id, user.account_id);
  }
}
