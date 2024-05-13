async function listarProductos() {
  const conexion = await fetch("http://localhost:3001/productos");
  const conexionConvertida = conexion.json();
  return conexionConvertida;
}

async function enviarProducto(nombre, precio, imagen) {
  const conexion = await fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    }),
  });

  const conexionConvertida = conexion.json();
  return conexionConvertida;
}

async function eliminarProducto(id) {
  try {
    const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "DELETE"
    });

    if (conexion.ok) {
      return { success: true, message: "Producto eliminado exitosamente." };
    } else {
      const errorMessage = await conexion.text(); // Obtiene el mensaje de error como texto
      throw new Error(errorMessage || "No se pudo eliminar el producto.");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}



export const conexionAPI = {
  listarProductos,
  enviarProducto,
  eliminarProducto
};