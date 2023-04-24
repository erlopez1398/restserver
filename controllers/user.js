const { response, request}  = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const userGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
}

const userPut = (req=request, res = response) => {

    const { id } = req.params;//desectructurado

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const userPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //const {nombre,edad} = req.body; parseo

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
        /*nombre,
        edad */ //parseo
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    usersPatch
}