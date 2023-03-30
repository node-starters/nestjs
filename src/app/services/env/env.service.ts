import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigData } from '../../app.validations';

@Injectable()
export class EnvService extends ConfigService<ConfigData, true> {
  readonly port: number = this.get('PORT') || 3000;
}
