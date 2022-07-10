export type Options = {
  env?: string;
  port?: number;
  hostname?: string
}

declare global {
  interface Request {
    query: Record<string, string>;
    params: Record<string, string>;
    body: object | string;
  }
}
