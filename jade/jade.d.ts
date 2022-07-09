export type Options = {
  port: number;
}

declare global {
  interface Request {
    query: Record<string, string>;
    params: Record<string, string>;
  }
}
