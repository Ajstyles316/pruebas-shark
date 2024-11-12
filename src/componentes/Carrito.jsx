import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../context/context';
import '../styles/Carrito.css';
import CalificarCompra from '../componentes/Calificacion';

import SeleccionarMetodoPago from '../componentes/MetodoDePago';

import "./carrito2.css";
const Carrito = () => {
  const { cart: [productosCarrito, setCart], total: [total, setTotal], discountedTotal, discountCode } = useContext(DataContext);
  
  const [isModalOpen, setModalOpen] = useState(false); 
  const [isSelectionOpen, setSelectionOpen] = useState(false); 

  const handleActualizarProducto = (productoId, cantidad) => {
    if (cantidad < 1) {
      alert("La cantidad no puede ser menor que 1");
      return;
    }
    setCart((prevCart) =>
      prevCart.map((producto) =>
        producto.id === productoId ? { ...producto, quantity: cantidad } : producto
      )
    );
    actualizarTotal();
  };

  const handleEliminarProducto = (productoId) => {
    setCart((prevCart) => prevCart.filter((producto) => producto.id !== productoId));
    actualizarTotal();
  };

  const actualizarTotal = () => {
    const newTotal = productosCarrito.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(newTotal);
  };

  const handleCantidadChange = (e, productoId) => {
    const cantidad = parseInt(e.target.value, 10);
    setCart((prevCart) =>
      prevCart.map((producto) =>
        producto.id === productoId ? { ...producto, quantity: isNaN(cantidad) ? 1 : cantidad } : producto
      )
    );
    actualizarTotal();
  };

 
  const handleMetodoPago = () => {
    setSelectionOpen(true); 
    console.log(isModalOpen)
    console.log(isSelectionOpen)
  };

  return (
    <div className="carrito-container">
      <img src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png" alt="Carrito" />
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
                  value={producto.quantity}
                  onChange={(e) => handleCantidadChange(e, producto.id)}
                  className="input-cantidad"
                />
              </div>
              <div className="carrito-botones">
                <button
                  onClick={() => handleActualizarProducto(producto.id, producto.quantity)}
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
      <div className="carrito-total">
        {discountCode ? ( 
          <>
            <h3>Total Original: {total} Bs.</h3>
            <h3>Código de Descuento Aplicado: {discountCode}</h3>
            <h3>Total con Descuento: {discountedTotal} Bs.</h3>
          </>
        ) : (
          <h3>Total: {total} Bs.</h3>
        )}
      </div>
      <button className="btn-aceptar" onClick={handleMetodoPago}>
        Aceptar
      </button>
      {isSelectionOpen && (
        <div className="modal-overlay-medio"> 
          <div className="modal-content-medio">
            <SeleccionarMetodoPago carrito={productosCarrito}/>
          </div>
        </div>
      )}
  
      {isModalOpen && (
        <div className="modal-overlay"> 
          <div className="modal-content">
            <CalificarCompra carrito={productosCarrito} onConfirmar={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

Carrito.propTypes = {
  onConfirmar: PropTypes.func.isRequired,
};

export default Carrito;
