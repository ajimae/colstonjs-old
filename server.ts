import Jade, { ResponseHelper } from "./jade";

/**
 * TODO:
 * 1. split the "use" into http verbs:
 * such as server.get, server.post etc
 *  
 * 2. preserve server.use as application
 * level middleware that take in only a
 * callback 
 * 
 * 3. implement a full middleware system
 * 
 * 4. strip out radix3 and ufo for custom
 * router table and parser
 */
const server: Jade = new Jade();

server.get('/', function (ctx: ResponseHelper): Response {
  return ctx.status(200).json({ data: { message: "playing around with bunjs..." } });
});

server.get('/ping', function (ctx: ResponseHelper): Response {
  return ctx.status(200).json({ data: { message: "pong" } });
});

server.get('/name/:name', function (ctx: ResponseHelper): Response {
  return Response.json({
    data: {
      params: ctx.request.params
    }
  })
});

server.use(function (request) {
  const { host, pathname } = new URL(request.url);
  console.info("::" + host.split(":")[1] + " - - ", [new Date()], " - - " + request.method + " " + pathname + " HTTP 1.1");
})

server.get('/?:name&age', function (ctx): Response {
  return Response.json({
    data: {
      query: ctx.request.query
    }
  })
});

// server.use('/', async function (_: Request) {
//   // perform some actions here and return a response
//   const data = await Promise.resolve(_data);
//   return Response.json({
//     status: 200,
//     statusText: 'OK',
//     data
//   })
// });


/**
 * @description
 * @param {number} port
 * @param {Function} callback
 */
server.start(8085)
