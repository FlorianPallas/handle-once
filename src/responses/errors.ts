import { APIResponse } from '.';

export class APIError<T> extends APIResponse<T> {
  constructor(
    args: Pick<APIError<T>, 'statusCode' | 'code' | 'message' | 'data'>
  ) {
    super({ ...args, $type: 'error' });
  }
}

export class BadRequestError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 400, code: 'BAD_REQUEST', data, message });
  }
}

export class UnauthorizedError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 401, code: 'UNAUTHORIZED', data, message });
  }
}

export class ForbiddenError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 403, code: 'FORBIDDEN', data, message });
  }
}

export class NotFoundError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 404, code: 'NOT_FOUND', data, message });
  }
}

export class MethodNotAllowedError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 405, code: 'METHOD_NOT_ALLOWED', data, message });
  }
}

export class InternalServerError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 500, code: 'INTERNAL_SERVER_ERROR', data, message });
  }
}

export class NotImplementedError<T> extends APIError<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 501, code: 'NOT_IMPLEMENTED', data, message });
  }
}
