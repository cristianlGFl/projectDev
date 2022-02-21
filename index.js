const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));


// import routes
const authRoutes = require('./routes/auth');
const validateTToken = require('./routes/validate-token');
const admin = require('./routes/admin');

// route middlewares

app.use('/api/user', authRoutes);
app.use('/api/admin', validateTToken, admin);
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})