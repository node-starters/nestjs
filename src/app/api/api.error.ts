import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors: { reason: string }[];
}

export class ApiException extends HttpException {
  static throw(...errors: string[]): never {
    throw new ApiException(...errors);
  }
  getResponse!: () => ErrorResponse;
  constructor(...errors: string[]) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable Entity',
        errors: errors.map((reason) => ({ reason })),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
