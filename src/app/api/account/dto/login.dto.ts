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

export class LoginResponseDto extends ResponseDto {
  @ApiProperty({
    default: '{JWT_TOKEN}',
    description: 'Auth Token',
  })
  result!: string;
}
