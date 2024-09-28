import { useState } from 'react';
import PropTypes from 'prop-types';
import Mesa from '../assets/eventos-sociales-1200x900.jpg'
import Silla from '../assets/casa-infinito-1928.jpeg'
import '../styles/SeleccionProducto.css';

const SeleccionProducto = ({ agregarAlCarrito }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const productos = [
    { id: 1, name: 'Mesa de Banquete', precio: 50, imagen: Mesa },
    { id: 2, name: 'Decoración Floral', precio: 60, imagen: Silla },
  ];

  const cambiarProducto = (direccion) => {
    if (direccion === 'next') {
      setSelectedProduct((prev) => (prev + 1) % productos.length);
    } else {
      setSelectedProduct((prev) => (prev - 1 + productos.length) % productos.length);
    }
  };

  const agregarProducto = () => {
    agregarAlCarrito(productos[selectedProduct]);
  };

  return (
    <div className="transacciones">
      <h2>Selección de Producto</h2>
      <div className="product-selection">
        <button onClick={() => cambiarProducto('prev')} className="arrow-btn">←</button>
        <img src={productos[selectedProduct].imagen} alt={productos[selectedProduct].name} />
        <button onClick={() => cambiarProducto('next')} className="arrow-btn">→</button>
      </div>
      <button className="btn-agregar" onClick={agregarProducto}>Agregar al Carrito
          <img src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png" alt="Carrito" />
      </button>
    </div>
  );
};

SeleccionProducto.propTypes = {
  agregarAlCarrito: PropTypes.func.isRequired,
};

export default SeleccionProducto;
