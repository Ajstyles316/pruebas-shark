import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { agregarProductoAlCarrito, obtenerProductosDelCarrito } from "../services/firebaseFunctions"; 

const Carrito = ({ navegar }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const productosFirebase = await obtenerProductosDelCarrito();
      setProductos(productosFirebase);
    };
    cargarProductos();
  }, []);

  const manejarAgregarAlCarrito = async (producto) => {
    await agregarProductoAlCarrito(producto); // Llama a la función para agregar el producto
    alert(`${producto.nombre} agregado al carrito`); // Mensaje de confirmación
  };

  return (
    <div className="transacciones">
      <h2>Carrito de Compras</h2>
      {productos.map((producto, index) => (
        <div key={index} className="cart-item">
          <p>{producto.nombre}</p>
          <p>{producto.precio} $</p>
          <button className="btn-agregar" onClick={() => manejarAgregarAlCarrito(producto)}>
            Agregar al Carrito
          </button>
        </div>
      ))}
      <button className="btn-confirmar" onClick={() => navegar("descuento")}>
        Código de Descuento
      </button>
      <button className="btn-finalizar" onClick={() => navegar("calificacion")}>
        Confirmar
      </button>
    </div>
  );
};

// Validación de props
Carrito.propTypes = {
  navegar: PropTypes.func.isRequired,
};

export default Carrito;
