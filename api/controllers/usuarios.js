const ServicioPG = require('../services/pg')

let validarInformacion = info => {

    if (!info.tipo_documento || !info.documento || !info.nombre || !info.apellidos || !info.celular || !info.correo || !info.rol || !info.clave) {
        throw {
            ok: false,
            mensaje: "Todos los campos son obligatorios",
            info: info
        };
    }

}

//metodo para guardar usuarios en la base de datos 
let guardarInfoUsuario = async info => {

    let servicio = new ServicioPG();
    let sql = `insert into usuarios (tipo_documento,documento,nombre,apellidos,celular,correo,rol,clave) values($1,$2,$3,$4,$5,$6,$7,md5($8))`
    let valores = [info.tipo_documento, info.documento, info.nombre, info.apellidos, info.celular, info.correo, info.rol, info.clave];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta;

}

//metodo que obtiene todos los usuarios desde base de datos

let obtenerInfoUsuario = async () => {

    let servicio = new ServicioPG();
    let sql = `select * from usuarios`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;

}


//metodo que obtiene todos los usuarios de un rol especifico desde base de datos
let obtenerInfoUsuarioRol = async (rol) => {

    let valores=[rol];
    let servicio = new ServicioPG();
    let sql = `select * from usuarios where rol = $1`
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;

}


//metodo que obtiene un usuario especifico  desde base de datos
let obtenerInfoUsuarioEspecifico = async (documento) => {

    
    let servicio = new ServicioPG();
    let sql = `select * from usuarios where documento = $1`;
    let valores=[documento];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta

}

// metodo para eliminar un usuario en la base de datos
let eliminarUsuario = async (req,res) => {
    let documento = req.params.documento;
    let servicio = new ServicioPG();
    let sql = `delete from usuarios where documento = $1`;
    let valores = [documento];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    res.json(`usuario con documento: ${documento} eliminado exitosamente`)
    return respuesta;
}

// metodo para actualizar un usuario en la base de datos
let actualizarUsuario = async (documento,info) => {

    let servicio = new ServicioPG();
    let valores = [documento,info.tipo_documento,info.nombre,info.apellidos,info.celular,info.correo,info.rol,info.clave]
    let sql = `UPDATE usuarios set tipo_documento=$2,nombre=$3,apellidos=$4,celular=$5,correo=$6,rol=$7,clave=md5($8) where documento = $1`
    let respuesta = await servicio.ejecutarSQL(sql,valores);
    return respuesta;

}





module.exports={validarInformacion,guardarInfoUsuario,obtenerInfoUsuario,obtenerInfoUsuarioRol,obtenerInfoUsuarioEspecifico,eliminarUsuario,actualizarUsuario}
