import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResponseDto } from '@api/api.dto';

export class ProfileResultDto {
  static parse(data: object) {
    const result = new ProfileResultDto();
    result._id = data['_id'];
    result.name = data['name'];
    result.email = data['email'];
    return result;
  }
  @ApiProperty()
  @IsNotEmpty()
  _id!: string;
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
