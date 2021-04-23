const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoInit = require('./src/db/index');
const decodeIDToken = require('./src/authenticatedToken');
const routes = require('./src/routes/index');
const PORT = 8080 || process.env.PORT;

const app = express();

//iniciar mongo 

mongoInit();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({strict: false}));
app.use(decodeIDToken);

routes(app);
app.listen(PORT, ()=>{
    console.log(`Server corriendo en el puerto ${PORT}`)
})