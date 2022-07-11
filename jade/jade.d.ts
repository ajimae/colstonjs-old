import _Context from './context';
declare global {
  interface Request {
    query: Record<string, string>;
    params: Record<string, string>;
    body: object | string;
  }
}

export type Options = {
  env?: string;
  port?: number;
  hostname?: string;
}

export type Next = () => Promise<void> | void;
export type Context = _Context;

export type Middleware<T> = (context: T, next?: Next) => Response | void;
