const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/user');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {


    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado:false'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        //const googleUser = await googleVerify(id_token);
        const {nombre, img, correo} = await googleVerify(id_token);
   
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //tengo que crearlo

            const data = {
                nombre,
                correo,
                password:'XD',
                img,
                rol:'USER_ROLE',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
            
        }

        //Si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado, Hable con el Administrador para reactivar su cuenta'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}