const express = require('express')
const router = express.Router()
const {validarInformacion,guardarInfoMoto,obtenerInfoMoto,obtenerInfoMotoEspecifica,eliminarMoto,actualizarMoto} = require('../controllers/motos')


router.get('/',(req,res) => {
    res.send("Bienvenido a la api del taller de motos")
})

//endpoint para obtener todas las motos
router.get('/motos',(req,res) => {
    obtenerInfoMoto().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

//endpoint para obtener la moto de una determinada placa
router.get('/motos/:placa', (req,res)=>{
    let placa= req.params.placa 
    obtenerInfoMotoEspecifica(placa).then(respuesta=>{
        res.send(respuesta.rows)
    }).catch(error=>{
        res.send(error)
        console.log(error);
        
    })

})

//endpoint para guardar una moto en la base de datos
router.post('/motos', (req, res) => {

    try {
        let infoMoto = req.body;
        validarInformacion(infoMoto);
        guardarInfoMoto(infoMoto).then(respuesta => {
            res.send({ok:true, mensaje:"La informacion se guardo correctamente", info: infoMoto})
            
        }).catch(error => {
            console.log("La informacion NO se guardo correctamente",error)
            res.send(error)
        })


    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

//endpoint para eliminar una moto de la base de datos

router.delete('/motos/:placa',eliminarMoto)



//endpint para actualizar informacion de una moto
router.put('/motos/:placa',(req,res)=>{
    let placa =req.params.placa;
    let info  = req.body;

    actualizarMoto(placa,info).then(respuesta=>{
        res.json(`moto con placa  ${placa} actualizada exitosamente`);
        

        
    }).catch(error=>{
        console.log(error)
        res.send(error)
    })
})

module.exports = router;

