const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 4000

const app = express()
// express listo pa recibir info a través de formualrios
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server iniciando en el puerto ${port}`))
