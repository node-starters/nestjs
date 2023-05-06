import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResponseDto } from '@api/api.dto';

export class LoginPayloadDto {
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

export class LoginResultDto {
  static parse(data: object) {
    const result = new LoginResultDto();
    result.accessToken = data['accessToken'];
    result.refreshToken = data['refreshToken'];
    return result;
  }
  @ApiProperty({
    default: '{JWT_TOKEN}',
    description: 'Access Token',
  })
  accessToken!: string;
  @ApiProperty({
    default: '{JWT_TOKEN}',
    description: 'Refresh Token',
  })
  refreshToken!: string;
}

export class LoginResponseDto extends ResponseDto {
  @ApiProperty({
    type: LoginResultDto,
    description: 'Login Result',
  })
  result!: LoginResultDto;
}
