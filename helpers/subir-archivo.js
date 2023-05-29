const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas=['png', 'jpg', 'jpeg', 'gif'], carpeta='') => {

    return new Promise((resolve, reject) => {

        //sampleFile = req.files.sampleFile;
        const { archivo } = files;

        //saber la extención del archivo
        const nombreCortado = archivo.name.split('.');

        //sacar la extesion
        const extension = nombreCortado[nombreCortado.length - 1];

        //validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });


}


module.exports = { subirArchivo }