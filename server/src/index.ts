// const { createServer } = require('http')
import { createServer } from "http";
import { parse } from "url";
import next from "next";

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req: any, res: any) => {
//     // Be sure to pass `true` as the second argument to `url.parse`.
//     // This tells it to parse the query portion of the URL.
//     const parsedUrl = parse(req.url, true);
//     const { pathname, query } = parsedUrl;

//     if (pathname === "/a") {
//       app.render(req, res, "/a", query);
//     } else if (pathname === "/b") {
//       app.render(req, res, "/b", query);
//     } else {
//       handle(req, res, parsedUrl);
//     }
//   }).listen(3000, (err: any) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });

// TODO see https://github.com/vercel/next.js/blob/canary/examples/custom-server-typescript/package.json

const port = parseInt(process.env.PORT || '3031', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname, query } = parsedUrl;

    if(pathname === "?") {
        app.render(req, res, "/a", query);
    }

    handle(req, res, parsedUrl)
  }).listen(port)

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})

app.getRequestHandler