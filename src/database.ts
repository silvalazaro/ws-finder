const MongoClient = require('mongodb').MongoClient;
const mongo = new MongoClient("mongodb://localhost:27017/finder", { useUnifiedTopology: true });
mongo.connect().then(async(con) => {
    console.log("Mongo Conectado!");
    const db = con.db('finder')
    //usuarios
    await db.createCollection('usuarios')
    .then(()=>{
        console.log('usuarios criado')
    }).catch((err)=>{
        console.log("erro usuarios")
        console.log(err)
    })

    const usuarios = db.collection('usuarios')
    
    await usuarios.createIndex('email', {
        unique: true
    }).then(()=>{
        console.log('indice email criado')
    }).catch(()=>{
        console.log("Erro email indice")
    })

    con.close();
})
.finally(()=>{
    console.log('finalizado')
})