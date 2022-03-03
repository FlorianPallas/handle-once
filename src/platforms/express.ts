import type { Request, Response, Handler } from 'express';
import { type UContext, type UHandler, getMethodHandler } from '.';
import { type APIResponse, APIReply, OKReply, APIError } from '..';

export interface ExpressHandlerContext extends UContext {
  req: Request;
  res: Response;
}

export type ExpressHandler<T> = UHandler<T, ExpressHandlerContext>;

export const getExpressHandler: <T = any>(
  handler: UHandler<T, ExpressHandlerContext>
) => Handler = (handler) => async (req, res) => {
  const context = getContext(req, res);

  try {
    const reply = await handler(context);
    if (reply instanceof APIReply) {
      apply(res, reply);
    } else {
      // Wrap data in reply
      apply(res, new OKReply(reply));
    }
  } catch (error) {
    // Only catch custom errors
    if (!(error instanceof APIError)) {
      throw error;
    }

    apply(res, error);
  }
};

export const getExpressMethodHandler: (handlers: {
  [key: string]: UHandler<any>;
}) => Handler = (handlers) => getExpressHandler(getMethodHandler(handlers));

const apply = (res: Response, response: APIResponse<any>) => {
  res.status(response.statusCode).json(response);
};

const getContext = (req: Request, res: Response): ExpressHandlerContext => {
  return {
    $platform: 'express',
    method: req.method ?? '',
    body: req.body,
    query: req.query,
    headers: req.headers,
    req,
    res,
  };
};
