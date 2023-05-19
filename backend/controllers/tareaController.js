const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler (async (req, res) => {
    //muestra las tareas que haya creado mi ususario
    const tareas = await Tarea.find({user: req.user.id})
    
    res.status(200).json(tareas)
})

const setTareas = asyncHandler (async (req, res) => {
    if(!req.body.texto) {
        //res.status(400).json({mensaje: 'Teclea la descripcion de la tarea'})
        res.status(400)
        throw new Error ('Favor de teclear una descripción para la tarea')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        //usuario
        user: req.user.id
    })
    res.status(201).json(tarea)
})

const updateTareas = asyncHandler ( async (req, res) => {
    
    // primero el ID
    const tarea = await Tarea.findById(req.params.id)
    //verificamos que la tarea exista
    if (!tarea) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }
    // verificamos q la tarea pertenece al usuario del token
    if (tarea.user.toString() !== req.user.id) {    
        res.status(401)
        throw new Error('Acceso no autorizado, la tarea no pertenece al usuario')
    }

    const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(tareaModificada)
})

const deleteTareas = asyncHandler ( async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //verificamos que la tarea pertenece al usuario
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la tarea no pertenece al usuario logeado')
    }

    //await tarea.remove()
    await tarea.deleteOne()

   //const tareaBorrada = await Tarea.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}