//importar librerias
const express = require('express')
const cors = require('cors')

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//versiones
const vs = "/apiFinal/v1/"

//importar las rutas con los endpoints especificos


//puerto
const port = 3002

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})