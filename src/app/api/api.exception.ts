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
  500: 'Bad Implementation',
};

export class ApiException extends HttpException {
  static badData(...errors: string[]): never {
    throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, ...errors);
  }
  static unAuthorized(...errors: string[]): never {
    throw new ApiException(HttpStatus.UNAUTHORIZED, ...errors);
  }
  static badImplementation(...errors: string[]): never {
    throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, ...errors);
  }
  getResponse!: () => ErrorResponse;
  constructor(status: HttpStatus, ...reasons: string[]) {
    super(
      {
        statusCode: status,
        error: HTTP_MESSAGES[status],
        message: reasons[0],
        reasons: reasons.map((reason) => ({ reason })),
      },
      status,
    );
    HttpStatus.EXPECTATION_FAILED;
  }
}
