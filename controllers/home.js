const { response, request } = require('express');

const URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const URL_SEACH = 'https://collectionapi.metmuseum.org/public/collection/v1/search'
const URL_OBJETOS= 'https://collectionapi.metmuseum.org/public/collection/v1/objects'
const URL_OBJETO='https://collectionapi.metmuseum.org/public/collection/v1/objects/'


const selec = async (req,res) => {
    try{
        const response = await fetch (`${URL}/departments`)
        const data = await response.json() 
        return data.departments ? data.departments : []
        res.render('../views/home.pug', { departments: data.departments ? data.departments : []});
    }
    catch(error){
        return []
    }
}



const pruebaCard = async (req,res) =>{
    try{
        const response = await fetch(`${URL_OBJETO}555`)
        const data = await response.json()
        return data;
    }
    catch(error){
        return error
    }
}

/* function veinteObjetos(objectsIDs){
    for(objectsID of objectsIDs){
        fetch(URL_OBJETO+objectsIDs)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
        })
    }
}

fetch(URL_OBJETOS)
.then((response)=>response.json())
.then(data =>{
    veinteObjetos(data.objectsIDs.slice(0,20));
}) */


    const busqueda = async(req,res) =>{

        try{
            const departments = await selec();
            const palabraClave = req.body.keyword || ''
            const departamento = req.body.departments || ''
            const localizacion = req.body.location || ''
            console.log("location" + localizacion);

            const objectsPerPage = 20;
            const currentPage = parseInt(req.query.page) || 1;
            
            const paramLocalizacion = localizacion != "" ? `&geoLocation=${localizacion}` : ""
            const paramQ = palabraClave != "" ? `?q=${palabraClave}`: `?q=''` 
            const paramDepartamento = departamento != "" ? `&departmentId=${departamento}` : ""

            console.log(URL_SEACH+`${paramQ}${paramDepartamento}${paramLocalizacion}`);

            const response = await fetch(URL_SEACH+`${paramQ}${paramDepartamento}${paramLocalizacion}`);
            const data = await response.json();
            const ids = Array.isArray(data.objectIDs) ? data.objectIDs.slice(0, 1000) : [];//tengo solo los ids

            const startIndex = (currentPage - 1) * objectsPerPage;
            const objectIdsToFetch = ids.slice(startIndex, startIndex + objectsPerPage);
            
            const detallesPromesas = objectIdsToFetch.map(id => fetch(URL_OBJETO+`${id}`));//segunda llamada a la api
            const detallesRespuestas = await Promise.all(detallesPromesas);
            const detallesObras = await Promise.all(detallesRespuestas.map(res => res.json()));

            console.log(ids+"data");
            res.render('../views/home.pug',{departments, detallesObras, currentPage, totalPages: Math.ceil(ids.length / objectsPerPage),palabraClave, departamento, localizacion})
        }
        catch(error){
            console.log("error en metodo busqueda"+error.message)
        } 
    }

    const imagenesAdicionales = async (req,res) => {
        const id = req.params.id;
        console.log(id);
        console.log(URL_OBJETO + id)
         const response = await fetch(URL_OBJETO + id);
         
        const data =  await response.json();
        console.log(data);
        const imagenesAd = data.additionalImages;
        
        res.render('../views/additionalImages.pug', {imagenesAd}) 

    }

   /*  const paginado = async( req,res) => {
        const objectsPerPage = 10;
        const currentPage = parseInt(req.query.page) || 1;  
        console.log(currentPage);

  // Obtener todos los IDs de objetos
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
        const data = await response.json();
        const allObjectIds = data.objectIDs;

  // Obtener los IDs de objetos para la página actual
        const startIndex = (currentPage - 1) * objectsPerPage;
        const objectIdsToFetch = allObjectIds.slice(startIndex, startIndex + objectsPerPage);

  // Obtener los detalles de los objetos
        const objects = await Promise.all(objectIdsToFetch.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
        ));

  // Renderizar la vista con los objetos
        res.render('../views/test.pug', { detallesObras:objects, currentPage, totalPages: Math.ceil(allObjectIds.length / objectsPerPage) });

} */



 const test = async (req, res) => {
       const departments = await selec();
       res.render('../views/home.pug', {departments, detallesObras:{},currentPage:0, totalPages:0});
        
} 



const consulta= async (req,res) => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1')
    const data = await response.json()
    res.render('../views/home.pug',{title: 'hey', message:'holiss'});
}

module.exports = {

    consulta,
    test,
    busqueda,
    imagenesAdicionales
   
}