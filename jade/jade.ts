import { createRouter } from "radix3";
import type { RadixRouter } from "radix3";
import type { Options } from "./jade.d";

/**
 * @class Jade
 * @description add route to routeTable, match and process request
 * @properties { RadixRouter } router routeTable
 * @method use
 * @method fetch
 */
export default class Jade {
  private cache: object = {}
  private options: Options;
  private router: RadixRouter;

  /**
   * @description overloaded constructor
   * @param {object} options
   */
  constructor(options?: Options) {
    this.options = options;
    this.router = createRouter();
  }

  /**
   * 
   * @param key 
   * @param value 
   */
  public set(key: string, value: any) {
    this.cache[key] = value;
  }

  /**
   * 
   * @param key 
   * @returns 
   */
  public get(key: string) {
    return this.cache[key]
  }

  /**
   * @description add level route 
   * @param {string} path 
   * @param {Function} handler 
   */
  public use(
    path: string,
    handler: (request: Request) => Response | Promise<Response>) {
    this.router.insert(path, {
      handler
    });
  }

  /**
   * @description match pathname again routeTable
   * @param {string} pathname 
   * @returns {*} match route
   */
  private lookup(pathname) {
    return this.router.lookup(pathname);
  }

  /**
   * @description bun fetch function
   * @param {Request} request bun request object
   * @returns {Response} bun response object
   */
  private fetch(request: Request): Response {
    const { pathname } = new URL(request.url);
    const match = this.lookup(pathname)

    if (match) {
      request.params = match.params || {};
      return match.handler(request) as Response;
    }

    return Response.json({
      status: 404,
      statusText: "Not Found"
    });
  }

  /**
   * @description bun http server entry point
   * @returns bun server instance
   */
  public start(port?: number, cb?: Function) {
    const self = this;
    if (typeof cb == 'function') cb.call(this);
    return Bun.serve({
      port: port || self.options?.port,
      fetch: self.fetch.bind(self)
    });
  }
}
