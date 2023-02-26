const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    // Retonar una promesa para esperar el callback y se realize el proceso
    return new Promise((resolve, reject) => {
        // Payload con la informacion
        const payload = {uid};

        // Firmar el token
        jwt.sign(payload,process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err) {
                // No se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // Token
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}