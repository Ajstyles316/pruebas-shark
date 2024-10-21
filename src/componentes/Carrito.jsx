import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { obtenerProductosDelCarrito, eliminarProductoDelCarrito, actualizarProductoEnCarrito } from '../services/firebaseFunctions';
import '../styles/Carrito.css';

const Carrito = ({ onConfirmar }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);

  useEffect(() => {
    const cargarProductosCarrito = async () => {
      const productos = await obtenerProductosDelCarrito();
      setProductosCarrito(productos);
    };
    cargarProductosCarrito();
  }, []);

  const handleActualizarProducto = async (productoId, cantidad) => {
    if (cantidad < 1) {
      alert("La cantidad no puede ser menor que 1");
      return;
    }
    await actualizarProductoEnCarrito(productoId, { cantidad });
    setProductosCarrito((prev) =>
      prev.map((p) => (p.id === productoId ? { ...p, cantidad } : p))
    );
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      await eliminarProductoDelCarrito(productoId);
      setProductosCarrito((prev) => prev.filter((p) => p.id !== productoId));
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  const handleCantidadChange = (e, productoId) => {
    const cantidad = parseInt(e.target.value, 10);
    setProductosCarrito((prev) =>
      prev.map((p) => (p.id === productoId ? { ...p, cantidad: isNaN(cantidad) ? 1 : cantidad } : p))
    );
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      <div className="carrito-items-container">
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto, index) => (
            <div key={producto.id || index} className="carrito-item">
              <img src={producto.imagen} alt={producto.name} className="carrito-imagen" />
              <div className="carrito-precio">
                <p>{producto.name}</p>
                <input
                  type="number"
                  min="1"
                  value={producto.cantidad}
                  onChange={(e) => handleCantidadChange(e, producto.id)}
                  className="input-cantidad"
                />
              </div>
              <div className="carrito-botones">
                <button
                  onClick={() => handleActualizarProducto(producto.id, producto.cantidad)}
                  className="btn-actualizar"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => handleEliminarProducto(producto.id)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
      <button className="btn-aceptar" onClick={onConfirmar}>
        Aceptar
      </button>
    </div>
  );
};

Carrito.propTypes = {
  onConfirmar: PropTypes.func.isRequired
};

export default Carrito;
