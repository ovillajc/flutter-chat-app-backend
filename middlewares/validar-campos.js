
//! Middleware que verifica si los campos no estan vacios

const { validationResult } = require("express-validator");

// next para idicar que si todo sale bien continue con el siguiente middlware
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // Para que avance al siguiente middleware
    next();
}


module.exports = {
    validarCampos
}