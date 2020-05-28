const ServicioPG = require('../services/pg')


//validar que toda la informacion este completa
let validarInformacion = info => {

    if (!info.placa || !info.estado || !info.clase || !info.marca || !info.modelo || !info.color || !info.cilindraje || !info.id_propietario || !info.nro_soat || !info.vencimiento_soat || !info.nro_tecnomecanica || !info.vencimiento_tecnomecanica) {
        throw {
            ok: false,
            mensaje: "Todos los campos son obligatorios",
            info: info
        };
    }
}

//metodo para guardar motos en la base de datos 

let guardarInfoMoto = async info => {

    let servicio = new ServicioPG();
    let sql = `insert into motos (placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`
    let valores = [info.placa, info.estado, info.clase, info.marca, info.modelo, info.color, info.cilindraje, info.id_propietario, info.nro_soat, info.vencimiento_soat, info.nro_tecnomecanica, info.vencimiento_tecnomecanica];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta;

}


//metodo que obtiene todas las motos desde base de datos

let obtenerInfoMoto = async () => {

    let servicio = new ServicioPG();
    let sql = `select * from motos`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;

}

//metodo que obtiene una moto especifica  desde base de datos
let obtenerInfoMotoEspecifica = async (placa) => {

    let servicio = new ServicioPG();
    let sql = `select * from motos where placa = $1`;
    let valores = [placa];
    let respuesta = await servicio.ejecutarSQL(sql, valores);

    return respuesta

}


//metodo que obtiene las motos en mal estado
let obtenerInfoMotoMalo = async (estado) => {

    let servicio = new ServicioPG();
    let sql = `select * from motos where estado = $1`;
    let valores = [estado];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta
}


// metodo para eliminar una moto en la base de datos
let eliminarMoto = async (req,res) => {
    let placa = req.params.placa;
    let servicio = new ServicioPG();
    let sql = `delete from motos where placa = $1`;
    let valores = [placa];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    res.json(`moto con placa: ${placa} eliminada exitosamente`)
    return respuesta;
}

// metodo para actualizar una moto en la base de datos
let actualizarMoto = async (placa,info) => {

    let servicio = new ServicioPG();
    let valores = [placa,info.estado,info.clase,info.marca,info.modelo,info.color,info.cilindraje,info.id_propietario,info.nro_soat,info.vencimiento_soat,info.nro_tecnomecanica,info.vencimiento_tecnomecanica ]
    let sql = `UPDATE motos set estado=$2,clase=$3,marca=$4,modelo=$5,color=$6,cilindraje=$7,id_propietario=$8,nro_soat=$9,vencimiento_soat=$10,nro_tecnomecanica=$11,vencimiento_tecnomecanica=$12 where placa = $1`
    let respuesta = await servicio.ejecutarSQL(sql,valores);
    
    console.log("Aqui",respuesta)
    return respuesta;

}


//metodo para actualizar el estado de una moto
let actualizarEstadoMoto = async (placa,estado) => {

    let servicio = new ServicioPG();
    let valores = [placa,estado]
    let sql = `UPDATE motos set estado=$2 where placa = $1`
    let respuesta = await servicio.ejecutarSQL(sql,valores);
    return respuesta;

}






module.exports = { validarInformacion, guardarInfoMoto, obtenerInfoMoto, obtenerInfoMotoEspecifica , eliminarMoto, actualizarMoto ,obtenerInfoMotoMalo,actualizarEstadoMoto};

