const {response} = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    // Obtener el email y devolver erro en caso de ya estar en uso
    const {email, password} = req.body;

    try {
        // Buscar correo existente en la db
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // Extrer info del body y guardarlo en db mediante el modelo
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            // body: req.body,
            usuario,
            token,
            msg: 'Cuenta creada existosamente'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// IniciarSesion
const login = async(req, res = response) => {
    // Obtener los datos que enviaron mediante el request
    const {email, password} = req.body;

    try {
        // Verficiar el email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        
        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        // Respuesta de un login exitoso
        res.json({
            ok: true,
            // body: req.body,
            usuario: usuarioDB,
            token,
            msg: 'Inicio de sesion correcto'
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {

    // uid del usuario
    const uid = req.uid;

    // Generar el nuevo JWT
    const token = await  generarJWT(uid);

    // Obtener el usuario por uid
    const usuario = await Usuario.findById(uid);

    // Devolver respuesta con la data
    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}