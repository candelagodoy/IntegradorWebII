const { response, request } = require('express');


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
    consulta
}