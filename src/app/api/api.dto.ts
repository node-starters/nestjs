import { ApiProperty } from '@nestjs/swagger';

export class Response {
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

export class ErrorResult {
  @ApiProperty({
    description: 'Error Message',
  })
  reason!: string;
}

export class ErrorResponse {
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
    type: ErrorResult,
    description: 'Possible Errors',
  })
  errors!: ErrorResult[];
}
