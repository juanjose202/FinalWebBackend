//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')


const secret_key = process.env.SECRET_KEY;


/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarLogin = info => {
    if(!info.correo || !info.clave){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}


/**
 * Metodo que verifica el correo y la clave en la base de datos 
 * @param {*} info 
 */
let consultarUsuarioCorreo = async info => {
    let servicio = new ServicioPG()
    let sql = `select * from usuarios where correo = $1 and clave = md5($2)`
    let valores = [info.correo.toLowerCase(),info.clave]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que genera el token 
 * @param {*} usuario 
 */
let generarToken = (usuario) => {
    delete usuario.clave;
    let token = jwt.sign(usuario,secret_key)
    return token;
}


/**
 * Metodo que verifica el token
 * @param {*} token 
 */
let verificarToken = token => {
    return jwt.verify(token,secret_key);
}


/**
 * Metodo que desencripta el token
 * @param {} token 
 */
let desencriptarToken = token => {
    return jwt.decode(token);
}


module.exports={validarLogin,consultarUsuarioCorreo,generarToken,verificarToken,desencriptarToken}