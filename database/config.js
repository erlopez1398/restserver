const mongoose = require('mongoose');

const dbConnection = async () => {

        await mongoose
            .connect(process.env.MONGODB_CNN)
            .then(() => console.log("DB funcionando"))
            .catch((error) => console.error(error));
    /*try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('error al conectar la base de datos');
    }*/
}

module.exports = {
    dbConnection
}