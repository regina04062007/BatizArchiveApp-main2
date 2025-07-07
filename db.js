require('dotenv').config();

const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,       
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

conexion.connect(function(error) {
    if (error) {
        console.error('Error al conectar con la BD:', error.message);
        throw error;
    } else {
        console.log('Conectado a la BD:', process.env.DB_HOST);
    }
});

module.exports = conexion;