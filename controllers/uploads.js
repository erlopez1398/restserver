const { response } = require("express");



const cargarArchivo = (req, res = response) =>{
    res.json({
        msg:'oki'
    });
}


module.exports = {cargarArchivo}