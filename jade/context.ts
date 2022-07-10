export default class Context {
  code: number;
  request: Request;
  response: Response | null;
  readonly url: string;
  readonly path: string;
  readonly host: string;
  readonly method: string;
  readonly headers: Request["headers"];

  constructor(request: Request) {
    console.log(request.method, '>?>')
    this.request = request;
    this.url = request.url;
    this.method = request.method;
    this.host = new URL(request.url).host;
    this.headers = request.headers;
  }

  public status(code: number): Context {
    this.code = code;
    return this;
  }

  /**
   * @warning method might behave unexpectedly 
   * @param raw 
   * @returns 
   */
  private raw(raw: Response) {
    return raw;
  }

  // private _response(data: any, options) {
  //   new Response(data, options);
  // }

  public head(options: ResponseInit = { headers: {} }): Response {
    options.status = 204;
    options.statusText = "No Content";
    return new Response(null, options);
    // return this;
  }

  public json(json: { [key: string]: any }, options: ResponseInit = { headers: {} }) {
    options.headers["Content-Type"] = "application/json";
    options.status = this.code || options.status;
    options.statusText = options.statusText || "OK";
    return new Response(JSON.stringify(json), options);
    // return this;
  }

  public text(text: string, options: ResponseInit = { headers: {} }) {
    options.headers["Content-Type"] = "text/plain";
    options.status = this.code || options.status;
    options.statusText = options.statusText || "OK";
    return new Response(text.toString(), options);
    // return this;
  }
}

