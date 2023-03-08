const getTareas = (req, res) => {
    res.status(200).json({mensaje: 'Mostrar las tareas'})
}

const setTareas = (req, res) => {
    if(!req.body.text) {
        //res.status(400).json({mensaje: 'Teclea la descripcion de la tarea'})
        res.status(400)
        throw new Error ('Favor de teclear una descripción para la tarea')
    }
    res.status(201).json({mensaje: 'Crear una tarea'})
}

const updateTareas = (req, res) => {
    res.status(200).json({mensaje: `Modificar la tarea ${req.params.id}`})
}

const deleteTareas = (req, res) => {
    res.status(200).json({mensaje: `Eliminar la tarea ${req.params.id}`})
}

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}