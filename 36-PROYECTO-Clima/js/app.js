const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault()
    
    //Validar
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios')
        return;
    }

    //Consultar la API
    consultarAPI(ciudad,pais);

}

function mostrarError(msj){
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta){
        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-nd','mx-auto','mt-6','text-center')

        alerta.innerHTML = `
            <strong class = "font-bold">Error!</strong>
            <span class = "block">${msj}</span>
        `

        container.appendChild(alerta)

        //Se elimine la alerta despues de 3 segundos
        setTimeout(()=>{
            alerta.remove()
        },3000);
    }
}

function consultarAPI(ciudad,pais){

    const appId = '08b63a1dea1a936c69ad756541df2750';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    //Muestra un spinner de carga
    spinner();

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            //Limpiar HTML previo
            limpiarHTML();
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return;
            }
            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const {name,main : {temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold','text-2xl')
    

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)

    resultado.appendChild(resultadoDiv);
    
}
const kelvinACentigrados=grados=>parseInt(grados-273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){

    limpiarHTML();

    const divSpinner= document.createElement('div');
    divSpinner.classList.add('.sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
    `
    resultado.appendChild(divSpinner)
}