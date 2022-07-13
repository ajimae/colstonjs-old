# 🍥 Colston.js

fast, lightweight and zero dependency framework for [bunjs](https://bun.sh) 🚀

![npm](https://img.shields.io/npm/v/colstonjs?color=blue&style=plastic)
![NPM](https://img.shields.io/npm/l/colstonjs?style=plastic)
![npm](https://img.shields.io/npm/dt/colstonjs?style=plastic)

## Table of Contents

- [Background](#background)
- [Prerequisite](#prerequisite)
- [Install](#install)
- [Usage](#usage)
  - [Examples](#examples)
      - [Hellow Bun](#hello-bun)
      - [Read request body as json or text](#read-request-body-as-json-or-text)
      - [Using named parameters](#using-named-parameters)
      - [Using query parameters](#using-query-parameters)
  - [Middleware](#middleware)
    - [Application-Level Middleware](#application-level-middleware)
    - [Route-Level Middleware](#route-level-middleware)
- [Application instance cache](#application-instance-cache)
- [Error Handler](#error-handler)
- [Contribute](#contribute-🧑‍💻)
- [License](#license-🔐)

## Background

Bun is the lastest and arguably the fastest runtime environment for javascript, similar to node and deno. Bun uses JSC (JavaScriptCore) engine unlike node and 
deno which is the part of the reason why it's faster then node and deno.

Bun is written in a low-level manual memory management programming language called [ZIG](https://ziglang.org).

Bun supports ~90% of the native nodejs APIs including `fs`, `path`etc and also distribute it's packages uses [npm](https://npmjs.com) hence both `yarn` and `npm` are supported in bun.

## Prerequisite
🐎 *Bun* - Bun needs to be installed locally on your development machine.


## Installation

💻  To install bun head over to the [offical website](https://bun.sh) and follow the installation instructions.

🧑‍💻  To install coltson run `bun add colstonjs`
#### _NOTE_
_Although colstonjs is distributed under npm, colstonjs is only available for bun, node and deno are not currently supported._

## Usage

Importing the colstonjs into the application

```typescript
import Colston from "colstonjs";

// initializing Colston 
const serverOptions = {
  port: 8000,
  env: "development"
};

// initialize app with server options
const app: Colston = new Colston(serverOptions);
```

A simple get request

```typescript
...
app.get("/", function(ctx) {
  return ctx.status(200).text("OK");
});
...
```

To allow the application to accept requests, we have to call the `start()` method with an optional
port and/or callback function.

This will start an `http` sever on the listening on all interfaces (`0.0.0.0`) listening on the specified port.

```typescript
server.start(port?, cb?);
```

### _NOTE_
* _`port` number can be passed into the `app` through the server options or the as the first argument of the `start()` mthod. If the the port number is passed as part of the server options and also in the `start()` mthod, then port number passed into to the `start()` takes priority. If no neither is provided, then the app will default to port `3000`_

* _`callback` method is immediately invoked once the connection is successfully established and the application is ready to accept requests._

### Examples

#### Hello Bun

```typescript
// server.ts
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

app.set("port", 8000);

app.get("/", (ctx: Context) => {
  return ctx.status(200).json({ message: "Hello World!" });
});

app.start(app.get('port'), () => console.log(`server listening on port ${app.get("port")}`));
```

#### Read request body as `json` or `text`

```typescript
// server.ts
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

app.get("/", async (ctx: Context) => {
  const body = await ctx.request.json();
  const body2 = await ctx.request.text();

  return ctx.status(200).json({ body, body2 });
});

app.start(8000);
```

#### Using named parameters


```typescript
// server.ts
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

app.get("/user/:id/name/:name", async (ctx: Context) => {
  const user = ctx.request.params;

  // make an api call to a backend datastore a to retrieve usre details
  const userDetails = await getUserDetails(details.id);

  return ctx.status(200).json({ user: userDetails});
});

app.start(8000);
```
#### Using query parameters


```typescript
// server.ts
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

app.get('/?name&age', async (ctx: Context) => {
  const query = ctx.request.query;

  return ctx.status(200).json(query);
});

app.start(8000);
```

### Middleware  

Colstonjs support both `route` level middleware as well as `app` level middleware.

#### Application-level middleware
This is a middleware which will be called on each request made to the server, one use case can be for logging.
```typescript
// logger.ts
export function logger(ctx) {
  const { host, pathname } = new URL(ctx.request.url);
  console.info([new Date()], " - - " + ctx.request.method + " " + pathname + " HTTP 1.1" + " - ");
}

// server.ts
import Colston, { type Context } from "colstonjs";
import { logger } from "./logger";

const app: Colston = new Colston({ env: "development" });

// middleware
app.use(logger);

app.get("/", (ctx: Context) => {
  return ctx.status(200).text("Hello logs...");
});

app.start(8000);
```

The `.use()` accepts `k` numbers of middleware function.
```typescript
...
app.use(fn-1, fn-2, fn-3, ..., fn-k)
...
```

#### Route-level middleware
Colston on the other hand allows you to add a middleware function in-between the route path and the handler function.

```typescript
// request-id.ts
export function requestID(ctx) {
  ctx.request.id = crypto.randomBytes(18).toString('hex');
}

// server.ts
import crypto from "crypto";
import Colston, { type Context } from "colstonjs";
import { requestID } from "./request-id";

const app: Colston = new Colston({ env: "development" });

app.get("/", requestID, (ctx: Context) => {
  return ctx.status(200).text(`id: ${ctx.request.id}`);
});

app.start(8000);
```

It is also worthy to note that we can also have `k` numbers of `route-level` middleware functions

```typescript
// server.ts
...
app.get("/", middleware-1, middleware-2, middleware-3, ..., middleware-k, (ctx: Context) => { 
  return ctx.status(200).text(`id: ${ctx.request.id}`);
});
...
```

## Application Instance Cache
We can cache simple data which will leave throughout the application instance lifecycle.

```typescript
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

// set properties to cache
app.set("age", 50);
app.set("name", "jane doe");

// check if a key exists in the cache
app.has("age"); // true
app.has("name"); // true

// retrieve the value stored in a given key
app.get("age"); // 50
app.get("name"); // jane doe

app.start(8000);
```
## Error handler
```typescript
// index.ts
import Colston, { type Context } from "colstonjs";

const app: Colston = new Colston({ env: "development" });

// a broken route
app.get("/error", (ctx) => {
  throw new Error("This is a broken route");
});

// Custom 404 not found handler
app.error = async function (error) {
  console.error("This is an error...");
  return Response.json(JSON.stringify(
    new Error(error.message || "An error occurred", error)
  ), { status: 500 });
}

app.start(8000);
```
## Contribute 🧑‍💻 
PRs for features, enhancements and bug fixes are welcomed. ✨ 

## License 🔐

[MIT](LICENSE.md)

### NOTE
Although this version is fairly stable, it might contain some bugs and not adviced to be used in a production environment yet.
