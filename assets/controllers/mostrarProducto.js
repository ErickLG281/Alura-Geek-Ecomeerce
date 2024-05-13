import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearCard(nombre, precio, imagen, id) {
  const producto = document.createElement("article");
  producto.className = "p-3 duration-300 shadow-lg bg-violet-950 rounded-xl hover:shadow-xl hover:transform hover:scale-105";
  producto.innerHTML = `<a href="#">
    <div class="relative flex items-end overflow-hidden rounded-xl">
      <img src="${imagen}" />
    </div>

    <div class="p-2 mt-1">
      <h2 class="font-bold text-slate-300">${nombre}</h2>

      <div class="flex items-end justify-between mt-3">
        <p class="text-lg font-bold text-yellow-500">$ ${precio}</p>

        <div class="flex items-center space-x-1.5 rounded-lg bg-yellow-600 px-4 py-1.5 duration-100 hover:bg-yellow-400">
          <button class="text-sm" data-id="${id}">
            <img src="./assets/svg/delet.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </a>`;

  producto.querySelector("button").addEventListener("click", async function () {
    const id = this.getAttribute("data-id");
   // console.log("ID del producto a eliminar:", id); // Agregar mensaje de depuración
    const result = await conexionAPI.eliminarProducto(id);
    if (result.success) {
      producto.remove();
      console.log(result.message);
    } else {
      console.error(result.message);
    }
  });

  return producto;
}


async function listarProductos() {
  const listaAPI = await conexionAPI.listarProductos();
  listaAPI.forEach((producto) => {
    //console.log("ID del producto:", producto.id); // Agregar mensaje de depuración
    lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.id));
  });
}

listarProductos();