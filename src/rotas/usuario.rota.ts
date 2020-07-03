import passport from "../passport";
import { DefaultState, Context } from "koa";
import * as KoaRouter from "koa-router";

const auth = new KoaRouter<DefaultState, Context>({
  prefix: "/auth",
});
// configurar passport
auth.get("/facebook", passport.authenticate("facebook"));

auth.get("/auth/facebook/callback", passport.authenticate("facebook"));
auth.get("/login", (ctx) => {
  ctx.body = "perfeito";
});

auth.get("/falha", (ctx) => {
  ctx.body = passport.authenticate("facebook");
});

auth.post("/", async (ctx) => {
  /*  const servico = ServicoFactory.Usuario(ctx.db)
     const usuario = await servico.find(ctx.request.body)
     if (usuario._id) {
         ctx.body = jwt.sign({
             usuario: usuario._id,
             exp: Math.floor(Date.now() / 1000) + 1000
         }, 'finder12345');
     } */
});

export default auth;
