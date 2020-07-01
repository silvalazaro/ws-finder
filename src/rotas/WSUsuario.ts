import * as Router from "koa-router";
import { DefaultState, Context } from 'koa';
import * as json from "class-transformer";
import { ROTA } from "./types";
import { Usuario } from "../model/Usuario";
const JSON = require('json-to-ts')


const rota = new Router<DefaultState, Context>();

rota.get(ROTA.USUARIO, async(ctx, next) => {
   ctx.body = await ctx.db.collection('usuario').find().toArray();
});  
rota.post(ROTA.USUARIO, (ctx, next) => {
    const user:Usuario = new Usuario()
    user.id = 1
    user.nome = 'Silva'
    ctx.body = 'POST usuario';
});
rota.put(ROTA.USUARIO, (ctx, next) => {
    const user = json.plainToClass(Usuario, ctx.request.body, { excludeExtraneousValues: true })
    //let obj =  ctx.request.body
    //const usuario = <Usuario>ctx.request.body;
    ctx.body = json.classToPlain(user);
    
});  
export default rota