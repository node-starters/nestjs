import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResponseDto } from '@api/api.dto';

export class ProfileResultDto {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;
  @ApiProperty()
  @IsEmail()
  email!: string;
}

export class ProfileResponseDto extends ResponseDto {
  @ApiProperty({
    type: ProfileResultDto,
    description: 'Profile Data',
  })
  result!: ProfileResultDto;
}
