import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginPayload {
  @ApiProperty()
  @IsEmail()
  email!: string;
  @ApiProperty()
  @IsNotEmpty()
  password!: string;
}

export class ProfileResult {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;
  @ApiProperty()
  @IsEmail()
  email!: string;
  @ApiProperty()
  @IsNotEmpty()
  password!: string;
}
