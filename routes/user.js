
const { Router } = require('express');
const { check } = require('express-validator');


const { userGet, userPut, userPost, userDelete, usersPatch } = require('../controllers/user');
const validarCampos = require('../middlewares/validar-campos');
const { esRoleValido } = require('../helpers/db-validators');

const router = Router();


router.get('/', userGet);

router.put('/:id', userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),//tambien puede ser .not().isEmpty()
    check('password', 'La contraseña debe ser más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], userPost);

router.delete('/', userDelete);

router.patch('/', usersPatch);




module.exports = router;