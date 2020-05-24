const express = require('express')
const router = express.Router()
const { validarInformacion, guardarInfoUsuario, obtenerInfoUsuario, obtenerInfoUsuarioRol, obtenerInfoUsuarioEspecifico, eliminarUsuario, actualizarUsuario } = require('../controllers/usuarios')


//endpoint para obtener todos los usuarios 
router.get('/usuarios', (req, res) => {
    obtenerInfoUsuario().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})


//endpoint para obtener el usuario de un determinado documento
router.get('/usuarios/:documento', (req, res) => {
    let documento = req.params.documento
    obtenerInfoUsuarioEspecifico(documento).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
        console.log(error);

    })

})

//endpoint para obtener los usuarios de un determinado Rol
router.get('/usuariosRoles/:rol', (req, res) => {
    let rol = req.params.rol
    obtenerInfoUsuarioRol(rol).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

//endpoint para guardar un usuario en la base de datos
router.post('/usuarios', (req, res) => {

    try {
        let infoUsuario = req.body;
        validarInformacion(infoUsuario);
        guardarInfoUsuario(infoUsuario).then(respuesta => {
            res.send({ ok: true, mensaje: "La informacion se guardo correctamente", info: infoUsuario })

        }).catch(error => {
            console.log("La informacion NO se guardo correctamente", error)
            res.send(error)
        })


    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

//endpoint para eliminar un usuario en la base de datos
router.delete('/usuarios/:documento', eliminarUsuario)

//endpont para actualizar un usuario en la base de datos
router.put('/usuarios/:documento', (req, res) => {
    let documento = req.params.documento;
    let info = req.body;

    actualizarUsuario(documento, info).then(respuesta => {
        res.json(`Usuario con Documento  ${documento} actualizado exitosamente`);



    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})




module.exports = router;