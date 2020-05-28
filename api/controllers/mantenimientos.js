const ServicioPG = require('../services/pg')



//metodo que valida que se ingrese toda la informacion del mantenimiemto
let validarInformacion= info =>{


    if(!info.id_mecanico || !info.placa){
        throw{
            ok: false,
            mensaje: " documento del mecanico y placa son obligatorios",
            info:info
        }
    }
    
}





//metodo para guardar mantenimentos en la base de datos 
let guardarInfoMantenimiento = async info => {

    let servicio = new ServicioPG();
    let sql = `insert into mantenimientos (id_mecanico,placa,fecha,trabajos_realizados,horas_invertidas) values($1,$2,$3,$4,$5)`
    let date = new Date();
    let dia = date.getDate();
    let mes= date.getMonth()+1;
    let anio = date.getFullYear();
    let fecha= anio+"-"+mes+"-"+dia;
    let valores = [info.id_mecanico, info.placa,fecha,"Ninguno",0];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    return respuesta;

}

// trae todos los mantenimientos desde la base de datos
let obtenerInfoMantenimientos = async()=>{

    let servicio=new ServicioPG();
    let sql = `select * from mantenimientos`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

//trae todos los mantenimientos asociados a un mecanico especifico
let obtenerInfoMantenimientosMecanico = async (id_mecanico)=>{

    let servicio=new ServicioPG();
    let valores = [id_mecanico]
    let sql = `select * from mantenimientos where id_mecanico= $1`
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;

}

let obtenerInfoMantenimientosSinTrabajos= async()=>{
    let servicio=new ServicioPG();
    let sql = `select * from mantenimientos where trabajos_realizados= 'Ninguno'`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}


// metodo para eliminar un mantenimiento en la base de datos
let eliminarMantenimiento = async (req,res) => {
    let id_mecanico = req.params.id_mecanico;
    let placa = req.params.placa
    let servicio = new ServicioPG();
    let sql = `delete from mantenimientos where id_mecanico = $1 and placa = $2 `;
    let valores = [id_mecanico,placa];
    let respuesta = await servicio.ejecutarSQL(sql, valores);
    res.json(`Mantenimiento de motoc con placa: ${placa} eliminado exitosamente`)
    return respuesta;
}

let actualizarMantenimiento = async (id_mecanico,placa,info) => {

    let servicio = new ServicioPG();
    let valores = [id_mecanico,placa,info.fecha,info.trabajos_realizados,info.horas_invertidas]
    let sql = `UPDATE mantenimientos set fecha=$3,trabajos_realizados=$4,horas_invertidas=$5 where id_mecanico = $1 and placa = $2`
    let respuesta = await servicio.ejecutarSQL(sql,valores);
    return respuesta;

}





module.exports={validarInformacion,guardarInfoMantenimiento,obtenerInfoMantenimientos,obtenerInfoMantenimientosMecanico,eliminarMantenimiento,actualizarMantenimiento,obtenerInfoMantenimientosSinTrabajos};