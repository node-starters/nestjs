import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  reasons: { reason: string }[];
}

const HTTP_MESSAGES = {
  422: 'Unprocessable Entity',
  401: 'Unauthorized',
};

export class ApiException extends HttpException {
  static badData(...errors: string[]): never {
    throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, ...errors);
  }
  static unAuthorized(...errors: string[]): never {
    throw new ApiException(HttpStatus.UNAUTHORIZED, ...errors);
  }
  getResponse!: () => ErrorResponse;
  constructor(status: HttpStatus, ...reasons: string[]) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: HTTP_MESSAGES[status],
        message: reasons[0],
        reasons: reasons.map((reason) => ({ reason })),
      },
      status,
    );
  }
}
