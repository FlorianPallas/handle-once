import type { IncomingHttpHeaders } from 'http';
import { type APIResponse, MethodNotAllowedError } from '..';

type UMethod = string;
type UHeaders = IncomingHttpHeaders;
type UQuery = {
  [key: string]: string | string[] | UQuery | UQuery[] | undefined;
};
type UBody = any;
type UReply<T> = T | Promise<T> | APIResponse<T> | Promise<APIResponse<T>>;

export interface UContext {
  $platform: string;
  method: UMethod;
  headers: UHeaders;
  query: UQuery;
  body: UBody;
}

export type UHandler<T, C = UContext> = (context: C) => UReply<T>;

export const getHandler = <T = any>(handler: UHandler<T>) => handler;

export const getMethodHandler: (handlers: {
  [key: string]: UHandler<any>;
}) => UHandler<any> = (handlers) => (context) => {
  for (const key in handlers) {
    if (key.toUpperCase() === context.method.toUpperCase()) {
      return handlers[key](context);
    }
  }
  throw new MethodNotAllowedError();
};
