const ServicioPG = require('../services/pg')


//validar que toda la informacion este completa
let validarInformacion = info => {

    if (!info.placa || !info.estado || !info.clase || !info.marca || !info.modelo || !info.color || !info.cilindraje || !info.id_propietario || !info.nro_soat || !info.vencimiento_soat || !info.nro_tecnomecanica || !info.vencimiento_tecnomecanica) {
        throw {
            ok: false,
            mensaje: "Todos los campos son obligatorios",
            info:info
        };
    }
}

//metodo para guardar motos en la base de datos 

let guardarInfoMoto = async info => {
    
    let servicio = new ServicioPG();
    let sql = `insert into motos (placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica)
    values ($1,$2,$3,$4,$5,$6,$7,&8,$9,$10,$11,$12)`
    let valores = [info.placa, info.estado, info.clase, info.marca, info.modelo, info.color, info.cilindraje, info.id_propietario, info.nro_soat, info.vencimiento_soat, info.nro_tecnomecanica, info.vencimiento_tecnomecanica];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta;
    
}


//metodo que obtiene toda la informacion de las motos desde base de datos

let obtenerInfoMoto = async () => {

    let servicio = new ServicioPG();
    let sql = `select * from motos`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;

}


module.exports={validarInformacion,guardarInfoMoto,obtenerInfoMoto};

