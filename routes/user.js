
const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPut, userPost, userDelete, usersPatch } = require('../controllers/user');

const router = Router();


router.get('/', userGet);

router.put('/:id', userPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),//tambien puede ser .not().isEmpty()
    check('correo', 'El correo noe s válido').isEmail(),
],userPost);

router.delete('/', userDelete);

router.patch('/', usersPatch);




module.exports = router;