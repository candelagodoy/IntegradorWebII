const { response, request } = require('express');

const URL = 'https://collectionapi.metmuseum.org/public/collection/v1';


const selec = async (req,res) => {
    try{
        const response = await fetch (`${URL}/departments`)
        const data = await response.json() 
        if (data.departments) {
            res.render('../views/home.pug', { departments: data.departments });
        } else {
            res.render('../views/home.pug', { departments: [] });
        }

    }
    catch(error){
        console.error('Error en la solicitud:', error);
    }
}

const objetos= async(req, res) => {
    const data = ""
}


const prueba = async (request,res) => {
    res.send("bienvenido");
}

const consulta= async (req,res) => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1')
    const data = await response.json()
    res.render('../views/home.pug',{title: 'hey', message:'holiss'});
}

module.exports = {

    prueba,
    consulta,
    selec
}