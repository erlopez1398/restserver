const express = require('express')
const cors = require('cors');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares(),

        //Rutas de mi aplicación

        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listener() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;
