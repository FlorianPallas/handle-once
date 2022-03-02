import { APIResponse } from '.';

export class APIReply<T> extends APIResponse<T> {
  constructor(
    args: Pick<APIReply<T>, 'statusCode' | 'code' | 'message' | 'data'>
  ) {
    super({ ...args, $type: 'reply' });
  }
}

export class OKReply<T> extends APIReply<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 200, code: 'OK', data, message });
  }
}

export class CreatedReply<T> extends APIReply<T> {
  constructor(data?: T, message?: string) {
    super({ statusCode: 201, code: 'CREATED', data, message });
  }
}
