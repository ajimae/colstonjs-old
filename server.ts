import Jade from "jade";
import { data as _data } from "./data" // dummy data

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
const server = new Jade();

server.use('/ping', function (request: Request): Response {
  return Response.json({
    status: 200,
    statusText: "OK",
    data: {
      message: "pong"
    }
  })
});

server.use('/name/:name', function (request: Request): Response {
  return Response.json({
    status: 200,
    statusText: "OK",
    data: {
      name: request.params.name
    }
  })
});

server.use('/?:name&age', function (request: Request): Response {
  return Response.json({
    status: 200,
    statusText: "OK",
    data: {
      name: ''
    }
  })
});

server.use('/', async function (_: Request) {
  // perform some actions here and return a response
  const data = await Promise.resolve(_data);
  return Response.json({
    status: 200,
    statusText: 'OK',
    data
  })
});

/**
 * @description
 * @param {number} port
 * @param {Function} callback
 */
server.start(8085)
