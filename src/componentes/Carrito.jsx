import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { agregarProductoAlCarrito, obtenerProductosDelCarrito, eliminarProductoDelCarrito } from '../services/firebaseFunctions';
import '../styles/Carrito.css';
// Generar un precio aleatorio entre 50 y 500
const precioAleatorio = Math.floor(Math.random() * 450) + 50;

// Generar una URL de imagen aleatoria de Lorem Picsum (200x200 es el tamaño de la imagen)
const urlImagenAleatoria = `https://source.unsplash.com/random/200x200/?social-event`;
const Carrito = ({ onDescuento, onConfirmar }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosDelCarrito = await obtenerProductosDelCarrito();
      setProductos(productosDelCarrito);
    };
    fetchProductos();
  }, []);
  const handleAddNewProduct = async () => {
    const newProduct = {
      precio: precioAleatorio,
      imagen: urlImagenAleatoria,
    };
    await agregarProductoAlCarrito(newProduct);
    setProductos((prev) => [...prev, newProduct]);
  };
  // Eliminar producto del carrito y actualizar Firebase
  const handleEliminarProducto = async (productoId) => {
    await eliminarProductoDelCarrito(productoId);
    setProductos((prev) => prev.filter((p) => p.id !== productoId));
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      {productos.length > 0 ? (
        productos.map((producto) => (
          <div key={producto.id} className="carrito-item">
            <img src={producto.imagen} alt={producto.name} className="carrito-imagen" />
            <p>{producto.name}</p>
            <p className="carrito-precio">Precio: {producto.precio} $</p>
            <div className="carrito-botones">
              <button onClick={() => handleEliminarProducto(producto.id)} className="btn-eliminar">
                Eliminar
              </button>
              <button onClick={() => handleAddNewProduct(producto.id)} className="btn-agregar">Agregar nuevo producto</button>
            </div>
          </div>
        ))
      ) : (
        <p>El carrito está vacío.</p>
      )}
      <div className="checkbox">
        <input type="checkbox" id="confirmado" />
        <label htmlFor="confirmado">Colocar en confirmado</label>
      </div>
      <div className="carrito-botones-final">
        <button className="btn-descuento" onClick={onDescuento}>Código de Descuento</button>
        <button className="btn-confirmar" onClick={onConfirmar}>Confirmar</button>
      </div>
    </div>
  );
};

Carrito.propTypes = {
  onDescuento: PropTypes.func.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default Carrito;
