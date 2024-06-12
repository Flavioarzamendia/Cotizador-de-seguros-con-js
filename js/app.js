//constructores 

function Seguro(marca, year , tipo){
     this.marca = marca;
     this.year = year;
     this.tipo = tipo;
}

//realiza la cotizacion segun los datos

Seguro.prototype.cotizarSeguro = function (){

     /*
     1 = americano * 1.15
     2 = asiatico *1.05
     3 = europeo * 1.4
     */ 

     let cantidad;
     const base = 3000;

     switch (this.marca) {
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          case '3':
               cantidad = base * 1.4;
               break;
          
     
          default:
               break;
     }

     // leer el año

     const diferencia = new Date().getFullYear() - this.year;
     
     cantidad -= ((diferencia*3)*cantidad)/100;
     
     /*
     si el seguro es basico es un 30% mas 
     si el seguro es completo un 50% mas 
     */

     if(this.tipo ==='basico'){
          cantidad *= 1.30
     }else{
          cantidad *=1.50
     }

     return Math.round(cantidad);
}

function UI (){

}

//llenar las opciones de año

UI.prototype.LlenarOpciones = () =>{
     const max = new Date().getFullYear(),
      min = max - 20;

      const selectYear = document.querySelector('#year');

      for(let i = max; i> min ; i--){
          let option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option);
      }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje =  (mensaje , tipo) => {
     const div = document.createElement('div');

     if(tipo === 'error'){
          div.classList.add( 'error');

     }else{
          div.classList.add( 'correcto');
     }
     div.classList.add('mensaje', 'mt-10');

     div.textContent = mensaje;

     //insertar en el html

     const formulario = document.querySelector('#cotizar-seguro');
     formulario.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() => {
          div.remove()
     }, 3000);

}

UI.prototype.mostrarResultado = (seguro , total) => {
     

     const {marca , year , tipo} = seguro;

     let textoMarca;
     switch(marca){
          case '1': 
               textoMarca = "Americano"
               break;
          case '2': 
               textoMarca = "Asiatico"
               break;
          case '3': 
               textoMarca = "Europeo"
               break

          default:
               break;
          return textoMarca;
     }
     //crear resultado

     const div = document.createElement('div');

     div.classList.add('mt-10');

     div.innerHTML =  `<p class="header">Tu Resumen</p>
     <p class="font-bold">Marca: <span class="font-normal">  ${textoMarca}</span></p>
     <p class="font-bold">Tipo De Seguro: <span class="font-normal capitalize">  ${tipo}</span></p>
     <p class="font-bold">Año: <span class="font-normal">  ${year}</span></p>
     <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
     `
     const resultadoDiv = document.querySelector('#resultado');

     // mostar el spiner 
     const spiner = document.querySelector('#cargando');

     spiner.style.display = "block";

     setTimeout(() => {
          spiner.style.display = 'none';
          resultadoDiv.appendChild(div);
     }, 3000);
     
     

     
}

//intanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
     ui.LlenarOpciones(); // llena el select con los años
})

addEventListener();

function addEventListener(){
     const formulario = document.querySelector('#cotizar-seguro');
     formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
     e.preventDefault();

//leer marca seleccionada 
const marca = document.querySelector('#marca').value;

//leer año selecionado 
const year = document.querySelector('#year').value;
//leer tipo
const tipo = document.querySelector('input[name="tipo"]:checked').value;

if(marca === '' || year === '' || tipo === '' ){
     ui.mostrarMensaje('Todos los campos son Obligatorios', 'error');
     return
}
ui.mostrarMensaje('Cotizando', 'correcto');

     //limpar las cotizacion previas

     const resultados = document.querySelector("#resultado div");

     if(resultados != null){
          resultados.remove();
     }
    

//instanciar el seguro
const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();



//utilizar el prototype que cotiza
ui.mostrarResultado(seguro, total);

     
}