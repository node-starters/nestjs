import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { AppLogger } from '@shared/logger';
import { TokenService } from '@shared/token';
import { IToken, IUser } from '@decorators/user.decorator';
import { CacheService } from '@shared/cache';

@Injectable()
export class SessionService {
  constructor(
    private $logger: AppLogger,
    private $tokenService: TokenService,
    private $cacheService: CacheService,
  ) {}
  async create(data: CreateDto): Promise<object> {
    const payload = {
      tid: Date.now(),
      typ: data.type,
      aid: data.id,
    };
    return {
      accessToken: this.$tokenService.genAccessToken(payload),
      refreshToken: this.$tokenService.genRefreshToken(payload),
    };
  }

  async logout(token: IToken): Promise<void> {
    await this.$cacheService.blockToken(token);
  }
  async refresh(user: IUser): Promise<string> {
    return Promise.resolve(
      this.$tokenService.genAccessToken({
        tid: user.token.id,
        typ: user.type,
        aid: user.id,
      }),
    );
  }
}
