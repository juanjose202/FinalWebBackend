const express = require('express')
const router = express.Router()
const  {validarInformacion,guardarInfoMantenimiento,obtenerInfoMantenimientos,obtenerInfoMantenimientosMecanico,eliminarMantenimiento,actualizarMantenimiento}= require('../controllers/mantenimientos')

//endpoint para obtener todos los mantenimientos  
router.get('/mantenimientos', (req, res) => {
    obtenerInfoMantenimientos().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

//endpoint para obtener el mantenimiento de un determinado mecanico
router.get('/mantenimientos/:id_mecanico', (req, res) => {
    let id_mecanico = req.params.id_mecanico
    obtenerInfoMantenimientosMecanico(id_mecanico).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
        console.log(error);
    })
})

//endpoint para guardar un mantenimiento en la base de datos
router.post('/mantenimientos', (req, res) => {

    try {
        let infoMantenimiento = req.body;
        validarInformacion(infoMantenimiento);
        guardarInfoMantenimiento(infoMantenimiento).then(respuesta => {
            res.send({ ok: true, mensaje: "La informacion se guardo correctamente", info: infoMantenimiento })

        }).catch(error => {
            console.log("La informacion NO se guardo correctamente", error)
            res.send(error)
        })


    } catch (error) {
        console.log(error)
        res.send(error)
    }

});


//endpoint para eliminar un mantenimiento en la base de datos
router.delete('/mantenimientos/:id_mecanico/:placa', eliminarMantenimiento)



//endpont para actualizar un mantenimiento en la base de datos
router.put('/mantenimientos/:id_mecanico/:placa', (req, res) => {
    let id_mecanico = req.params.id_mecanico;
    let placa = req.params.placa
    let info = req.body;

    actualizarMantenimiento(id_mecanico,placa, info).then(respuesta => {
        res.json(`Mantenimiento de moto con placa  ${placa} actualizado exitosamente`);



    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})



module.exports = router;