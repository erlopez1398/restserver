const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

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
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}

/* estas son validaciones para categoria*/

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById({ _id: id });//
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`)
    }
}

//validacion para productos
const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById({ _id: id });

    if (!existeProducto) {
        throw new Error(`El id no existe ${'id'}`)
    }
}

//validar colecicones permitidas
const coleccionesPermnitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida. ${colecciones}`);
    }

    return true;
}


module.exports = { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId, coleccionesPermnitidas }