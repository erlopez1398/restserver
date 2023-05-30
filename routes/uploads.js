const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImage, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermnitidas } = require('../helpers');




const router = Router();



router.post('/', validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermnitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermnitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImage);


module.exports = router;