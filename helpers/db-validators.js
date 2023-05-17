const Role = require('../models/role');
const {Usuario, Categoria} = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en BD`)
    }
}

const emailExiste = async (correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el usuario existe
    const existeUsuario = await Usuario.findById({ _id: id });//
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${id}`)
    }
}

/* estas son validaciones para categoria*/

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById({ _id: id });//
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${id}`)
    }
}


module.exports = { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId }