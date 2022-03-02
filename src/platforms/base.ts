import { type APIResponse, MethodNotAllowedError } from '..';

export type BaseReply<T> =
  | T
  | Promise<T>
  | APIResponse<T>
  | Promise<APIResponse<T>>;

export interface BaseContext {
  $platform: string;
  method: string;
  query: { [key: string]: string | string[] };
  body: any;
}

export type BaseHandler<T, C = BaseContext> = (context: C) => BaseReply<T>;

export const getHandler = <T = any>(handler: BaseHandler<T>) => handler;
export const getMethodHandler: (handlers: {
  [key: string]: BaseHandler<any>;
}) => BaseHandler<any> = (handlers) => (context) => {
  const handler = handlers[context.method];
  if (handler) return handler(context);
  throw new MethodNotAllowedError();
};
