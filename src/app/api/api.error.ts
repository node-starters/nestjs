import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  static throw(...errors: string[]): never {
    throw new ApiException(...errors);
  }
  constructor(...errors: string[]) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable Entity',
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
