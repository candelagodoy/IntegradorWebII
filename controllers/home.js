const { response, request } = require('express');

const URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const URL_SEACH = 'https://collectionapi.metmuseum.org/public/collection/v1/search'
const URL_OBJETO='https://collectionapi.metmuseum.org/public/collection/v1/objects/'
var translate = require('node-google-translate-skidz');
let ids = [];


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


    const busqueda = async(req,res) =>{

        try{
            
            const palabraClave = req.body.keyword
            const departamento = req.body.departments
            const localizacion = req.body.location 
            const localizacionFormateada = localizacion.charAt(0).toUpperCase() + localizacion.slice(1).toLowerCase();
            
            const paramLocalizacion = localizacionFormateada != "" ? `&geoLocation=${localizacionFormateada}` : ""
            const paramQ = palabraClave != "" ? `?q=${palabraClave}`: `?q=''` 
            const paramDepartamento = departamento != "" ? `&departmentId=${departamento}` : ""

            console.log(URL_SEACH+`${paramQ}${paramDepartamento}${paramLocalizacion}`);

            const response = await fetch(URL_SEACH+`${paramQ}${paramDepartamento}${paramLocalizacion}`);
            const data = await response.json();
            ids = Array.isArray(data.objectIDs) ? data.objectIDs.slice(0, 1000) : [];

            console.log(ids)
            res.redirect('/paginado');
            
        }
        catch(error){
            console.log("Error en método busqueda "+ error.message)
        } 
    }

    async function traslateText(texto, iFuente, iDestino) {
        try{
            return new Promise((resolve,reject) =>{
                translate({
                    text: texto,
                    source: iFuente,
                    target: iDestino
                },function(result){
                    if(result && result.translation){
                        resolve(result.translation);
                    }else{
                        reject('Error en la traduccion');
                    }
                })
            })
        }
        catch(error){
            console.error('Error al intentar traducir el texto:', error);
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

    const paginado = async( req,res) => {
        const departments = await selec();

        const objectsPerPage = 20;
        const currentPage = parseInt(req.query.page) || 1;
        const startIndex = (currentPage - 1) * objectsPerPage;
        const objectIdsToFetch = ids.slice(startIndex, startIndex + objectsPerPage);

        const detallesPromesas = objectIdsToFetch.map(id => fetch(URL_OBJETO+`${id}`));
        const detallesRespuestas = await Promise.all(detallesPromesas);
        const detallesObras = await Promise.all(detallesRespuestas.map(res => res.json()));

        const productosTraducidos = await Promise.all(detallesObras.map(async obra =>{
        const tituloTraducido = obra.title ? await traslateText(obra.title, 'en', 'es') : obra.title
        const culturaTraducida = obra.culture ? await traslateText(obra.culture, 'en', 'es'): obra.culture;
        const dinastiaTraducida = obra.dynasty ? await traslateText(obra.dynasty, 'en', 'es'): obra.dynasty;
        const fechaTraducida = obra.objectDate ? await traslateText(obra.objectDate, 'en','es'): obra.objectDate;
        return{

                objectID: obra.objectID,
                primaryImageSmall: obra.primaryImageSmall,
                title: tituloTraducido,
                culture: culturaTraducida,
                dynasty: dinastiaTraducida,
                objectDate: fechaTraducida,
                additionalImages: obra.additionalImages
            }
        }))

        res.render('../views/home.pug', {departments, detallesObras:productosTraducidos, currentPage, totalPages: Math.ceil(ids.length / objectsPerPage) });

} 



 const index = async (req, res) => {
       const departments = await selec();
       res.render('../views/home.pug', {departments, detallesObras:{},currentPage:0, totalPages:0});
        
} 


module.exports = {

    index,
    busqueda,
    imagenesAdicionales,
    paginado
   
}