import { useState } from 'react';
import PropTypes from 'prop-types';
import { addProductToCart } from '../services/firebaseFunctions'; // Importa la función de Firebase
import Mesa from '../assets/eventos-sociales-1200x900.jpg';
import Catering from '../assets/catering.jpeg';
import Bebidas from '../assets/bebidas.jpg';
import Entre from '../assets/entretenimiento.jpg';
import Mobi from '../assets/mobiliario.jpeg';
import Musica from '../assets/musica.jpg';
import '../styles/SeleccionProducto.css';
import descuento from '../assets/image 16.png';

const onDescuento = () => {
  // Implementa la lógica del descuento aquí
};

const SeleccionProducto = ({ agregarAlCarrito }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const productos = [
    { id: 1, name: 'Decoración Floral', precio: 250, imagen: Mesa },
    { id: 2, name: 'Catering', precio: 460, imagen: Catering },
    { id: 3, name: 'Bebidas', precio: 40, imagen: Bebidas },
    { id: 4, name: 'Entretenimiento', precio: 100, imagen: Entre },
    { id: 5, name: 'Mobiliario', precio: 200, imagen: Mobi },
    { id: 6, name: 'Música', precio: 100, imagen: Musica }
  ];

  const cambiarProducto = (direccion) => {
    if (direccion === 'next') {
      setSelectedProduct((prev) => (prev + 1) % productos.length);
    } else {
      setSelectedProduct((prev) => (prev - 1 + productos.length) % productos.length);
    }
  };

  const agregarProducto = async () => {
    const productoSeleccionado = { ...productos[selectedProduct], cantidad: 1 }; // Se añade el producto con cantidad 1
    await addProductToCart(productoSeleccionado); // Añade el producto a Firebase
    agregarAlCarrito(productoSeleccionado); // Actualiza la UI localmente
  };

  return (
    <div className="transacciones">
      <h2>Selección de Producto</h2>
      <div className="product-selection">
        <button onClick={() => cambiarProducto('prev')} className="arrow-btn">←</button>
        <img src={productos[selectedProduct].imagen} alt={productos[selectedProduct].name} />
        <button onClick={() => cambiarProducto('next')} className="arrow-btn">→</button>
      </div>
      <div className='contexto'>
        <h3>{productos[selectedProduct].name}</h3>
        <p>{productos[selectedProduct].precio} Bs.</p>
      </div>
      <div className="boton-container">
        <button className="btn-agregar" onClick={agregarProducto}>
          Agregar al Carrito
          <img src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png" alt="Carrito" />
        </button>
        <button className="codigoDescuento" onClick={onDescuento}>
          <img src={descuento} alt="Ícono de Descuento" />
          Código de Descuento
        </button>
      </div>
    </div>
  );
};

SeleccionProducto.propTypes = {
  agregarAlCarrito: PropTypes.func.isRequired
};

export default SeleccionProducto;
