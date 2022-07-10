import { Errorlike, Serve, Server } from "bun";
import type { Options } from "./jade.d";
import parse from "./params";
import queryParse from "./query";
import readBody from "./body";
import Context from "./context";
import routeRegister from "./routeRegister";

/**
 * @class Jade
 * @description add route to routeTable, match and process request
 * @method use
 * @method fetch
 */
export default class Jade {
  private readonly options: Options = {};
  private readonly routeTable: object = {};
  private readonly middleware: Array<Function> = [];
  private readonly cache: Map<string, any> = new Map();

  /**
   * @description overloaded constructor
   * @param {object} options
   */
  constructor(options?: Options) {
    this.options = options;
  }

  /**
   * @description internal error handler
   * @param error
   * @returns response
   */
  private error(error: Errorlike): Response | undefined | Promise<Response | undefined> {
    console.error(error);
    return new Response(JSON.stringify(
      new Error(error.message || "An error occurred")
    ), { status: 500 });
  }

  /**
   * 
   * @param key 
   * @param value 
   */
  public set(key: string, value: any) {
    this.cache.set(key, value)
  }

  /**
   * 
   * @param {string} key
   * @return {boolean} true | false
   */
  public has(key: string) {
    return this.cache.has(key);
  }

  /**
   * 
   * @param path
   * @returns void
   */
  public get(path: string, cb?: Function): Response | string | Promise<Response> {
    if (!cb)
      return this.cache.get(path);
    routeRegister(path, "GET", cb, this.routeTable);
  }

  /**
   * 
   * @param path 
   * @param cb 
   */
  public post(path, cb) {
    routeRegister(path, "POST", cb, this.routeTable);
  }

  public patch(path, cb) {
    routeRegister(path, "PATCH", cb, this.routeTable);
  }

  public put(path, cb) {
    routeRegister(path, "PUT", cb, this.routeTable)
  }

  /**
   *
   */
  public delete(path, cb) {
    routeRegister(path, "DELETE", cb, this.routeTable)
  }

  /**
   * @description add level route 
   * @param {string} path 
   * @param {Function} handler 
   */
  public use(...cb: Array<(request: Request) => Response | Promise<Response> | void>): void {
    this.middleware.push(...cb);
  }

  /**
   * @description bun fetch function
   * @param {Request} request bun request object
   * @returns {Response} bun response object
   */
  private async fetch(request: Request): Promise<Response> {
    // invoke all app level middlewares
    this.middleware.forEach((cb, _) => {
      if (typeof cb == "function") {
        cb(request);
      }
    });

    let exists: boolean = false;
    let routes: Array<string> = [];

    routes = Object.keys(this.routeTable);

    // temporal fix for "/" path matching all routes before it.
    const index = routes.indexOf("/");
    if (index > -1) routes.push(routes.splice(index, 1)[0]);

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const parsedRoute = parse(route);

      if (
        new RegExp(parsedRoute).test(request.url) &&
        this.routeTable[route][request.method.toLowerCase()]
      ) {
        let cb = this.routeTable[route][request.method.toLowerCase()];
        const m = request.url.match(new RegExp(parsedRoute));

        request.params = m.groups;
        request.query = queryParse(request.url);
        request.body = readBody(request);

        exists = true;
        return cb(new Context(request)) as Response;
      }
    }

    if (!exists) {
      return Response.json({
        status: 404,
        statusText: "Not Found"
      }, { status: 404, statusText: "Not Found" });
    }
  }

  /**
   * @description bun http server entry point
   * @returns bun server instance
   */
  public start(port?: number, cb?: Function): Server {
    const self = this;
    if (typeof cb == "function") cb.call(this);
    return Bun.serve({
      fetch: self.fetch.bind(self),
      port: port || self.options?.port,
      development: self.options?.env == "development",
      hostname: self.options?.hostname,
      error: self.error
    } as Serve);
  }
}
