import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'HTTP Status',
    default: 200,
  })
  statusCode!: number;
  @ApiProperty({
    description: 'Message',
    default: 'Success',
  })
  message!: string;
}

export class ErrorResultDto {
  @ApiProperty({
    description: 'Error Message',
  })
  reason!: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP Status',
    default: 422,
  })
  statusCode!: number;
  @ApiProperty({
    description: 'HTTP Message',
    default: 'Unprocessable Entity',
  })
  message!: string;
  @ApiProperty({
    isArray: true,
    type: ErrorResultDto,
    description: 'Possible Errors',
  })
  errors!: ErrorResultDto[];
}
