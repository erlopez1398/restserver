const { response } =require('express');

const userGet = (req ,res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
}

const userPut = (req ,res = response) => {

    const {id} = req.params;//desectructurado

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const userPost = (req ,res = response) => {
    
    const body = req.body;
  //const {nombre,edad} = req.body; parseo

    res.json({
        msg: 'post API - controlador',
        body
       /*nombre,
       edad */ //parseo
    });
}

const userDelete = (req ,res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usersPatch = (req ,res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}



module.exports={
    userGet,
    userPut,
    userPost,
    userDelete,
    usersPatch
}