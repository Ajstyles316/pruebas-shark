import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { obtenerProductosDelCarrito, eliminarProductoDelCarrito, agregarProductoAlCarrito, actualizarProductoEnCarrito } from '../services/firebaseFunctions';
import '../styles/Carrito.css';

const Carrito = ({ onDescuento, onConfirmar }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ name: '', precio: 0, imagen: '' }); // Estado para agregar nuevo producto
  const [cantidadActualizar, setCantidadActualizar] = useState(1); // Estado para la actualización de cantidad

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
    if (nuevoProducto.name && nuevoProducto.precio) {
      await agregarProductoAlCarrito(nuevoProducto);
      setProductosCarrito((prev) => [...prev, nuevoProducto]);
      setNuevoProducto({ name: '', precio: 0, imagen: '' }); // Limpiar el formulario
    }
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
              {/* Botón para actualizar cantidad del producto */}
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

              {/* Botón para eliminar producto */}
              <button onClick={() => handleEliminarProducto(producto.id)} className="btn-eliminar">
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>El carrito está vacío.</p>
      )}

      {/* Sección para agregar un nuevo producto */}
      <div className="agregar-producto">
        <h3>Agregar Nuevo Producto</h3>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.name}
          onChange={(e) => setNuevoProducto((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto((prev) => ({ ...prev, precio: Number(e.target.value) }))}
        />
        <button className="btn-agregar" onClick={handleAgregarProducto}>
          Agregar Producto
        </button>
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
