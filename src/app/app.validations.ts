import { IsInt } from 'class-validator';

export class ConfigData {
  @IsInt()
  PORT: number;
}
