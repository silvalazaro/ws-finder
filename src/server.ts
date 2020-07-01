import rotas from './rotas'
const KOA = require('koa')
const LOG = require('koa-logger')
const MONGO = require('koa-mongo')
const BODY_PARSER = require('koa-bodyparser');
const JSON = require('koa-json')
const JWT = require('koa-jwt');

const app = new KOA();
// response
app
  .use(LOG())
  .use(BODY_PARSER())
  .use(JSON())
  .use(JWT({
    secret: 'finder12345'
  }).unless({ path: [/^\/auth/] }))
  .use(MONGO({
    host: 'localhost',
    port: 27017,
    readPreference: 'primary',
    ssl: false,
    db: 'finder'
  }))
  .listen(8080)
rotas.forEach((rota) => {
  app.use(rota.routes())
    .use(rota.allowedMethods())
})

app.on('error', (err, ctx) => {
});

console.log('Servidor iniciado...')