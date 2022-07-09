function parse(url: string): string {
  let i, j = 0;
  let str: string = "";
  for (i = 0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ":") {
      // eat all characters
      let param = "";
      for (j = (i + 1); j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      str += `(?<${param}>\\w+)`;
      i = j - 1;
    } else {
      str += c;
    }
  }

  return str;
}

export default parse;
/**
 * Todo crud application
 * developed using #bun
 */
// export default {
//   port: 8086,
//   async fetch(request: Request) {
//     // console.log(await request.json(), '>>>')
//     // return new Response("Hello, World\n");
//     const data = await request.json()
//     const res = {
//       env: process.env.NODE_ENV,
//       status: "success",
//       messge: "request completed successfully",
//       data
//     }
//     return new Response(JSON.stringify(res))
//   }
// }

// Bun.serve({
//   port: 8086,
//   async fetch(request: Request) {
//     console.log(request.url)
//     // console.log(await request.json(), '>>>')
//     // return new Response("Hello, World\n");
//     const data = await request.json()
//     const res = {
//       env: process.env.NODE_ENV,
//       status: "success",
//       messge: "request completed successfully",
//       data
//     }
//     return new Response(JSON.stringify(res))
//   }
// })
