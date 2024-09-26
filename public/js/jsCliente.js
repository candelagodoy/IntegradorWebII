
document.addEventListener("DOMContentLoaded", () => {
    const palabraClave = document.getElementById("keyword");
    const departamento = document.getElementById("departments");
    const localizacion = document.getElementById("location");
    let lerr = document.getElementById("listaErrores");
    //let lmen = document.getElementById("listaMensajes");

    const validarCampos = (event)=>{
        event.preventDefault();

        lerr.innerHTML="";
        palabraClave.classList.remove("error");
        departamento.classList.remove("error");
        localizacion.classList.remove("error");

        let errores = [];

        let pClave = palabraClave ? palabraClave.value.trim() : '';
        let dep = departamento ? departamento.value.trim() : ''; 
        let loc = localizacion ? localizacion.value.trim() : '';

        if(pClave === '' && dep === '' && loc === ''){

            errores.push("Debe completar al menos un campo")

            if (palabraClave) {
                palabraClave.classList.add('error');
            }
            if (departamento) {
                departamento.classList.add('error');
            }
            if (localizacion) {
                localizacion.classList.add('error');
            }
        }

        let exReg=/^[a-zA-Z]+$/;

        if(!exReg.test(pClave) && pClave.length !=""){
            errores.push("Sólo debe contener letras");
            if (palabraClave) {
                palabraClave.classList.add('error');
            }
        }

        


        if (errores.length > 0) {
            lerr.innerHTML = ''; 
            errores.forEach((error) => {
                const li = document.createElement('li');
                li.textContent = error;
                lerr.appendChild(li);
                lerr.classList.add("listaErrores");
            });
        } else {
            document.getElementById('form').submit();
        }}

    document.getElementById('form').onsubmit = validarCampos;
});

 function mostrarFecha(idObra){

    const card = document.getElementById(`card-${idObra}`);
    if(card){
        const date = document.getElementById(`fecha-${idObra}`)
        const objectDate = card.getAttribute('datosFecha');
            if( objectDate != "" || objectDate != null){
                date.innerHTML =`${objectDate}` 
                date.style.display = 'block';
            }
            else{
                date.innerHTML =`Fecha desconocida` 
                date.style.display = 'block';
            }   
        }  
}

 function ocultarFecha(idObra){
    const date = document.getElementById(`fecha-${idObra}`);
    if (date) {
        date.style.display = 'none';
    }
}
