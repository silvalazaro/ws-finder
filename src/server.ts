import rotas from "./rotas";
import passport from "./passport";
const KOA = require("koa");
const LOG = require("koa-logger");
const MONGO = require("koa-mongo");
const BODY_PARSER = require("koa-bodyparser");
const JSON = require("koa-json");
const JWT = require("koa-jwt");
const SSLIFY = require("koa-sslify").default;
const FS = require("fs");
const http = require("http");
const https = require("https");
const options = {
  key: FS.readFileSync("resources/finder.key"),
  cert: FS.readFileSync("resources/finder.cert"),
};

const app = new KOA();
// response
app
  .use(LOG())
  //app.use(SSLIFY())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { erro: err.message };
      ctx.app.emit("error", err, ctx);
    }
  })
  .use(passport.initialize())
  .use(passport.session())
  .use(BODY_PARSER())
  .use(JSON())
  .use(
    JWT({
      secret: "finder12345",
    }).unless({ path: [/^\/auth/] })
  )
  .use(
    MONGO({
      host: "localhost",
      port: 27017,
      readPreference: "primary",
      ssl: false,
      db: "finder",
    })
  );
rotas.forEach((rota) => {
  app.use(rota.routes()).use(rota.allowedMethods());
});

app.on("error", (err, ctx) => {
  // TODO
});
//app.listen(8081)d
http.createServer(app.callback()).listen(8081);
https.createServer(options, app.callback()).listen(8080);

console.log("Servidor iniciado...");
