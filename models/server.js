const express = require('express')




class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares(),

        //Rutas de mi aplicación

        this.routes();
    }

    middlewares() {

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }

    listener() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;