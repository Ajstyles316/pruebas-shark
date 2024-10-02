import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  obtenerProductosDelCarrito,
  eliminarProductoDelCarrito,
  agregarProductoAlCarrito,
  actualizarProductoEnCarrito
} from '../services/firebaseFunctions';
import '../styles/Carrito.css';
import Mesa from '../assets/eventos-sociales-1200x900.jpg';
import Catering from '../assets/catering.jpeg';
import Bebidas from '../assets/bebidas.jpg';
import Entretenimiento from '../assets/entretenimiento.jpg';
import Mobiliario from '../assets/mobiliario.jpeg';
import Musica from '../assets/musica.jpg';

const Carrito = ({ onDescuento, onConfirmar }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidadActualizar, setCantidadActualizar] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);

  // Definir productos disponibles
  const productosDisponibles = [
    { id: 1, name: 'Decoración Floral', precio: 250, imagen: Mesa },
    { id: 2, name: 'Catering', precio: 460, imagen: Catering },
    { id: 3, name: 'Bebidas', precio: 40, imagen: Bebidas },
    { id: 4, name: 'Entretenimiento', precio: 100, imagen: Entretenimiento },
    { id: 5, name: 'Mobiliario', precio: 200, imagen: Mobiliario },
    { id: 6, name: 'Música', precio: 100, imagen: Musica }
  ];

  // Cargar productos del carrito desde Firebase
  useEffect(() => {
    const cargarProductosCarrito = async () => {
      const productos = await obtenerProductosDelCarrito();
      setProductosCarrito(productos);
    };
    cargarProductosCarrito();
  }, []);

  // Agregar producto al carrito
  const handleAgregarProducto = async () => {
    const producto = productosDisponibles[productoSeleccionado];
    await agregarProductoAlCarrito(producto);
    setProductosCarrito((prev) => [...prev, producto]);
  };

  // Actualizar producto en el carrito (actualiza la cantidad)
  const handleActualizarProducto = async (productoId, nuevosDatos) => {
    await actualizarProductoEnCarrito(productoId, nuevosDatos);
    setProductosCarrito((prev) =>
      prev.map((producto) => (producto.id === productoId ? { ...producto, ...nuevosDatos } : producto))
    );
  };

  // Eliminar producto del carrito y actualizar en Firebase
  const handleEliminarProducto = async (productoId) => {
    await eliminarProductoDelCarrito(productoId);
    setProductosCarrito((prev) => prev.filter((p) => p.id !== productoId));
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <div key={producto.id} className="carrito-item">
            <img src={producto.imagen} alt={producto.name} className="carrito-imagen" />
            <p>{producto.name}</p>
            <p className="carrito-precio">Precio: {producto.precio} $</p>
            <div className="carrito-botones">
              <input
                type="number"
                value={cantidadActualizar}
                onChange={(e) => setCantidadActualizar(Number(e.target.value))}
                className="input-cantidad"
              />
              <button
                onClick={() => handleActualizarProducto(producto.id, { ...producto, cantidad: cantidadActualizar })}
                className="btn-actualizar"
              >
                Actualizar
              </button>

              <button onClick={() => handleEliminarProducto(producto.id)} className="btn-eliminar">
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>El carrito está vacío.</p>
      )}

      {/* Sección para agregar un nuevo producto con un select box */}
      <div className="agregar-producto">
        <h3>Agregar Nuevo Producto</h3>
        <select onChange={(e) => setProductoSeleccionado(e.target.value)}>
          {productosDisponibles.map((producto, index) => (
            <option key={producto.id} value={index}>
              {producto.name}
            </option>
          ))}
        </select>
        <div className="producto-detalles">
          <img
            src={productosDisponibles[productoSeleccionado].imagen}
            alt={productosDisponibles[productoSeleccionado].name}
            style={{ width: '200px', height: '150px' }}
          />
          <p>Precio: {productosDisponibles[productoSeleccionado].precio} $</p>
        </div>
        <button className="btn-agregar" onClick={handleAgregarProducto}>
          Agregar Producto
        </button>
      </div>

      <div className="carrito-botones-final">
        <button className="btn-descuento" onClick={onDescuento}>
          Código de Descuento
        </button>
        <button className="btn-confirmar" onClick={onConfirmar}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

Carrito.propTypes = {
  onDescuento: PropTypes.func.isRequired,
  onConfirmar: PropTypes.func.isRequired
};

export default Carrito;
