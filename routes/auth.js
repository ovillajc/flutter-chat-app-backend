/*
    path: api/login
*/

const {Router} = require('express');
const {check} = require('express-validator');

const {crearUsuario, login, renewToken}  = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//! Configuracion de rutas

// Crear nuevo usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], crearUsuario);

// Iniciar sesion
router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
], login);

// validarJWT
router.get('/renew', validarJWT, renewToken);


module.exports = router;