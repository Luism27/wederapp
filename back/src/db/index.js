const mongoose = require('mongoose');
const { config } = require('../config')
const initMongo = ()=>{
    mongoose.connect(
        config.mongoUri,
        {   
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
    ).then(()=>{
        console.log("Conectado a mongo")
    }).catch((err)=>{
        console.log(`no se pudo conectar a la db debido a: `, err)
    })
}

module.exports = initMongo;