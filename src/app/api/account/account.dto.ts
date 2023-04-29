import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Response } from '@api/api.dto';

export class LoginPayload {
  @ApiProperty({
    default: 'ashish@yopmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @ApiProperty({
    default: 'Admin@@321',
  })
  @IsNotEmpty()
  password!: string;
}

export class LoginResponse extends Response {
  @ApiProperty({
    default: '{JWT_TOKEN}',
    description: 'Auth Token',
  })
  result!: string;
}

export class ProfileResult {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;
  @ApiProperty()
  @IsEmail()
  email!: string;
}

export class ProfileResponse extends Response {
  @ApiProperty({
    type: ProfileResult,
    description: 'Profile Data',
  })
  result!: ProfileResult;
}
