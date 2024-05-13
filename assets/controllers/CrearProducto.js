import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento){
    
    evento.preventDefault();
    const nombre =  document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-url]").value;

      // Verificar si los campos están vacíos
      if (nombre.trim() === '' || precio.trim() === '' || imagen.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return; // Salir de la función si algún campo está vacío
    }

    await conexionAPI.enviarProducto(nombre,precio,imagen);


}

formulario.addEventListener("click", crearProducto);