import Jade, { type Context } from ".";

const server: Jade = new Jade();

server.get('/', function (ctx: Context): Response {
  return ctx.status(200).json({ data: { message: "playing around with bunjs..." } });
});

server.get(
  '/ping',
  function (ctx: Context, next) {
    next();
  },
  function (ctx: Context, next) {
    // next();
  },

  function (ctx: Context): Response {
    return ctx.status(200).json({ data: { message: "pong" } });
  });

server.get('/name/:name', function (ctx: Context): Response {
  return Response.json({
    data: {
      params: ctx.request.params
    }
  })
});

// server.post('/age', function (ctx, next) { server.set('name', 'meeky'); next() }, function (ctx) { return ctx.status(200).json({ n: 1 }) }).post('/name', (ctx) => ctx.json({ n: 2 })).get('/age', (ctx) => { console.log(server.get('name')); return ctx.json({}) });

function logger(ctx: Context) {
  const { host, pathname } = new URL(ctx.url);
  const id = ctx.request.id;
  console.info("::" + host.split(":")[1] + " - - ", [new Date()], " - - " + ctx.request.method + " " + pathname + " HTTP 1.1" + " - " + "id: " + id);
}

server.use(function (ctx: Context) {
  ctx.request.id = '67a73af8-0128-11ed-b939-0242ac120002';
}, logger);

server.get('/?:name&age', function (ctx): Response {
  return Response.json({
    data: {
      query: ctx.request.query
    }
  })
});

// console.log(server.set('name', 'meeky'));
// console.log(server.get('name'));

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
