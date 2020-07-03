const jwt = require("jsonwebtoken");
import * as KoaRouter from "koa-router";
import { DefaultState, Context } from "koa";
import * as json from "class-transformer";
import { LISTA_ROTAS } from "./types";
import { Modelo } from "../modelos/Modelo";
import { Usuario } from "../modelos/Usuario";
import { Servico, ServicoFactory } from "../servicos";
import auth from "./usuario.rota";
const rotas = [];

LISTA_ROTAS.forEach((config) => {
  const rota = new KoaRouter<DefaultState, Context>({
    prefix: config.prefixo,
  });
  rota.get("/", (ctx) => {
    const model = config.model;
    ctx.body = "teste";
  });
  rota.put("/", async (ctx) => {
    try {
      const model = config.model;
      const collection = config.tabela;
      const user = json.plainToClass(model, ctx.request.body, {
        excludeExtraneousValues: true,
      });
      const result = await ctx.db.collection(collection).insertOne(user);
      ctx.body = result;
    } catch (err) {
      err.status = err.statusCode || err.status || 500;
      // ctx.body = err.message;
      ctx.body = ctx.state;
      ctx.app.emit("error", err, ctx);
      // ctx.throw(400, err.message);
    }
  });
  rotas.push(rota);
});

rotas.push(auth);

export default rotas;
