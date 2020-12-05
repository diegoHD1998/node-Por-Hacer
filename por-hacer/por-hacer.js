const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        console.log('El archivo a sido creado');
    });
}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json')

    } catch (error) {
        listadoPorHacer = []
    }
    
    
}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)

    guardarDB()

    return porHacer;
}

let getListado = (completado) => {

    cargarDB()
    if(completado == null){
        return listadoPorHacer;
    }else{
        let listado2 = listadoPorHacer.filter((tarea)=> tarea.completado === completado)
        
        return listado2
    }

    
    
}

const actualizar = (descripcion, completado) => {

    cargarDB()

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion)

    if (index >= 0){
        listadoPorHacer[index].completado = completado
        guardarDB()
        return true

    }else{
        return false
    }

}

const borrar = (descripcion) => {
    cargarDB()

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion)

    if (index >=0) {
        listadoPorHacer.splice(index,1)
        guardarDB()
        return `La tarea fue eliminada`
    }else{
        return false
    }


}





module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}


 

