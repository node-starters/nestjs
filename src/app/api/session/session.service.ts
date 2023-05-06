import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { AppLogger } from '@shared/logger';
import { TokenService } from '@shared/token';
import { IToken, IUser } from '@decorators/user.decorator';
import { CacheService } from '@shared/cache';

@Injectable()
export class SessionService {
  constructor(
    private logger: AppLogger,
    private $tokenService: TokenService,
    private $cacheService: CacheService,
  ) {}
  async create(data: CreateDto): Promise<object> {
    return {
      accessToken: this.$tokenService.genAccessToken({
        aid: data.id,
        typ: data.type,
      }),
      refreshToken: this.$tokenService.genRefreshToken({
        aid: data.id,
        typ: data.type,
      }),
    };
  }

  async logout(token: IToken): Promise<void> {
    this.logger.log(token);
    this.$cacheService.blockToken(token);
  }
  async refresh(user: IUser): Promise<string> {
    return Promise.resolve(
      this.$tokenService.genAccessToken({
        aid: user.id,
        typ: user.type,
      }),
    );
  }
}
