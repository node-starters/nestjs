import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ResponseDto } from '@api/api.dto';

export class ChangePasswordDto {
  @ApiProperty({
    default: '{PWD}',
  })
  @IsNotEmpty()
  password!: string;
}

export class ChangePasswordResponseDto extends ResponseDto {
  @ApiProperty({
    description: 'Change Status',
  })
  result!: boolean;
}
