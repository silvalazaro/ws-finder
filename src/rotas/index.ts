const jwt = require('jsonwebtoken');
import * as KoaRouter from "koa-router"
import { DefaultState, Context } from 'koa';
import * as json from "class-transformer";
import { LISTA_ROTAS } from "./types"
const rotas = []


LISTA_ROTAS.forEach((config) => {
    const rota = new KoaRouter<DefaultState, Context>({
        prefix: config.prefixo
    })
    rota.get('/', (ctx) => {
        const model = config.model
        ctx.body = 'teste'
    })
    rota.put('/', async (ctx) => {
        try {
            const model = config.model
            const collection = config.tabela
            const user = json.plainToClass(model, ctx.request.body, { excludeExtraneousValues: true })
            const result = await ctx.db.collection(collection).insertOne(user)
            ctx.body = result
        } catch (err) {
            err.status = err.statusCode || err.status || 500;
           // ctx.body = err.message;
            ctx.body = ctx.state
            ctx.app.emit('error', err, ctx);
           // ctx.throw(400, err.message);
        }
    })
    rotas.push(rota)
})
const auth = new KoaRouter({
    prefix: '/auth'
    
})
auth.get('/', (ctx) => {
    ctx.body = jwt.sign({ usuario: 'lazaro',
     senha: '1020',
     exp: Math.floor(Date.now() / 1000) + 20
    }, 'finder12345');
})
rotas.push(auth)

export default rotas