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

export class ErrorReasonDto {
  @ApiProperty({
    description: 'Error Reason',
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
    description: 'Error Message',
    default: 'Something went wrong',
  })
  message!: string;
  @ApiProperty({
    description: 'HTTP Message',
    default: 'Unprocessable Entity',
  })
  error!: string;
  @ApiProperty({
    isArray: true,
    type: ErrorReasonDto,
    description: 'Possible Error Reasons',
  })
  reasons!: ErrorReasonDto[];
}
