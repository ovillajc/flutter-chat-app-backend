const mongoose = require('mongoose');

//Conexion con la db
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - hable con el admin')
    }
}

module.exports = {
    dbConnection
}