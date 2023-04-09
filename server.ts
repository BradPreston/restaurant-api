import Koa from "koa";
const app = new Koa();
import { postgraphile } from "postgraphile";
import { router } from './api/stores/index.ts';
import { createServer } from "http";
import { database, schemas, options } from './common.ts';
import dotenv from "dotenv"
dotenv.config();

const middleware = postgraphile(database, schemas, options);

app.use(middleware);
app.use(router.routes())
app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true
    }
  )
);

console.log("listening on port 3000");
const server = createServer(app.callback());
server.listen(3000, () => {
  const address = server.address()
  if (typeof address !== 'string') {
    const href = `http://localhost:${address.port}${options.graphiqlRoute || '/graphiql'}`;
    console.log(`PostGraphiQL available at ${href} 🚀`);
  } else {
    console.log(`PostGraphile listening on ${address} 🚀`);
  }
});