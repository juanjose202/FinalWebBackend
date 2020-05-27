//importar librerias
const express = require('express')
const cors = require('cors')
require("./server/keys.js")

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//versiones
const vs = "/apiFinal/v1/"

//importar las rutas con los endpoints especificos

const rutasLogin = require('./routes/autenticacion')
app.use(vs,rutasLogin)

const rutasMotos = require('./routes/motos')
app.use(vs,rutasMotos)


const rutasUsuarios= require('./routes/usuarios')
app.use(vs,rutasUsuarios)

const rutasMantenimientos= require('./routes/mantenimientos')
app.use(vs,rutasMantenimientos)

//puerto
const port = 3002

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})