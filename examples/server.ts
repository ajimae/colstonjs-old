// import crypto from "crypto"; //
import Colston, { type Context } from "..";


// export function requestID(ctx) {
//   ctx.request.id = crypto.randomBytes(18).toString('hex');
// }

const app: Colston = new Colston({ env: "development" });

// app.get("/?name&age", requestID, (ctx: Context) => {
//   const q = ctx.request.query;
//   console.log(q)
//   return ctx.status(200).text(`id: ${ctx.request.id} q`);
// });

// app.set("age", 50);
// app.set("name", "jane doe");

// check if a key exists in the cache
// console.log(app.has("age")); // true
// console.log(app.has("name")); // true

// // retrieve the value stored in a given key
// console.log(app.get("age")); // 50
// console.log(app.get("name")); // jane doe

app.get("/:name/id/:id", (ctx) => {
  return ctx.status(200).json({ ...ctx.request.params })
})

app.get("/ping", (ctx) => {
  return ctx.status(200).json({ message: "pong" });
})

app.get('/?name&age', function (ctx): Response {
  return Response.json({
    data: { query: ctx.request.query }
  });
});

// app.error = async function (error) {
//   console.error("This is an error...");
//   return Response.json(JSON.stringify(
//     new Error(error.message || "An error occurred", error)
//   ), { status: 500 });
// }

// app.get("/", (ctx) => {
//   throw new Error("This is a broken route");
// })

// app.get("/name", (ctx) => {
//   console.log(ctx.request.url)
//   return ctx.status(200).json({ n: "OK" });
// })

app.start(8000);























// server.get('/', function (ctx: Context): Response {
//   return ctx.status(200).json({ data: { message: "playing around with bunjs..." } });
// });

// server.get(
//   '/ping',
//   function (ctx: Context, next) {
//     next();
//   },
//   function (ctx: Context, next) {
//     // next();
//   },

//   function (ctx: Context): Response {
//     return ctx.status(200).json({ data: { message: "pong" } });
//   });

// server.get('/name/:name', function (ctx: Context): Response {
//   return Response.json({
//     data: {
//       params: ctx.request.params
//     }
//   })
// });

// // server.post('/age', function (ctx, next) { server.set('name', 'meeky'); next() }, function (ctx) { return ctx.status(200).json({ n: 1 }) }).post('/name', (ctx) => ctx.json({ n: 2 })).get('/age', (ctx) => { console.log(server.get('name')); return ctx.json({}) });
// server.get("/", (ctx) => {
//   // return ctx.status(203).json({ n: 'OK' });
//   return ctx.status(203).text("OK");
// })

// function logger(ctx: Context) {
//   const { host, pathname } = new URL(ctx.url);
//   const id = ctx.request.id;
//   console.info("::" + host.split(":")[1] + " - - ", [new Date()], " - - " + ctx.request.method + " " + pathname + " HTTP 1.1" + " - " + "id: " + id);
// }

// server.use(function (ctx: Context) {
//   ctx.request.id = '67a73af8-0128-11ed-b939-0242ac120002';
// }, logger);

// server.get('/?:name&age', function (ctx): Response {
//   return Response.json({
//     data: {
//       query: ctx.request.query
//     }
//   })
// });

// // console.log(server.set('name', 'meeky'));
// // console.log(server.get('name'));

// // server.use('/', async function (_: Request) {
// //   // perform some actions here and return a response
// //   const data = await Promise.resolve(_data);
// //   return Response.json({
// //     status: 200,
// //     statusText: 'OK',
// //     data
// //   })
// // });


// /**
//  * @description
//  * @param {number} port
//  * @param {Function} callback
//  */
// server.start()
