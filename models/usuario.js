const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false,
    },
});

// Sobre escribir un metodo para devolver informacion especifica
UsuarioSchema.method('toJSON', function() {
    // Extraer datos que no queremos devolver
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Usuario', UsuarioSchema);