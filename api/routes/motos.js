const express = require('express')
const router = express.Router()
const {validarInformacion,guardarInfoMoto,obtenerInfoMoto} = require('../controllers/motos')


router.get('/',(req,res) => {
    res.send("Bienvenido a la api del taller de motos")
})

router.get('/motos',(req,res) => {
    obtenerInfoMoto().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

//guardar una moto en la base de datos
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

module.exports = router;

