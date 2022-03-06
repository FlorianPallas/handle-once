import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { type UContext, type UHandler, getMethodHandler } from '.';
import { type APIResponse, APIReply, OKReply, APIError } from '..';

export interface NextHandlerContext extends UContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export type NextHandler<T> = UHandler<T, NextHandlerContext>;

export const getNextHandler: <T = any>(
  handler: UHandler<T, NextHandlerContext>
) => NextApiHandler = (handler) => async (req, res) => {
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

export const getNextMethodHandler: (handlers: {
  [key: string]: UHandler<any>;
}) => NextApiHandler = (handlers) => getNextHandler(getMethodHandler(handlers));

const apply = (res: NextApiResponse, response: APIResponse<any>) => {
  res.status(response.statusCode).json(response);
};

const getContext = (
  req: NextApiRequest,
  res: NextApiResponse
): NextHandlerContext => {
  return {
    $platform: 'next',
    method: req.method ?? '',
    body: req.body,
    query: req.query,
    headers: req.headers,
    req,
    res,
  };
};
