const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria } = require('../controllers/categorias');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es oblogatorio').notEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete')
});

module.exports = router;