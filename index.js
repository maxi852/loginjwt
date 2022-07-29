const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

let url = 'mongodb://localhost:27017/jwtLogin';

mongoose.Promise = global.Promise; //evita fallos en la conexión

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');

app.use('/api/user', authRoutes);
app.use('/api/dashboard', verifyToken, dashboadRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
mongoose.connect(url, {useNewUrlParser: true})
.then(() => {
    console.log('Conexión a la base de datos realizada con éxito');
    app.listen(3001, () => {
        console.log('Corriendo aplicación en el puerto ' + 3001);
    }
    )
})