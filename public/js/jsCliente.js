
document.addEventListener("DOMContentLoaded", () => {
    const palabraClave = document.getElementById("keyword");
    const departamento = document.getElementById("departments");
    const localizacion = document.getElementById("location");
    let lerr = document.getElementById("listaErrores");
    //let lmen = document.getElementById("listaMensajes");

    const validarCampos = (event)=>{
        event.preventDefault();


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

        //if(pClave = )

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
