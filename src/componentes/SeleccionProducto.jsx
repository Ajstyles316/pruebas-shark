import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { addProductToCart } from '../services/firebaseFunctions'; 
import Mesa from '../assets/eventos-sociales-1200x900.jpg';
import Catering from '../assets/catering.jpeg';
import Bebidas from '../assets/bebidas.jpg';
import Entre from '../assets/entretenimiento.jpg';
import Mobi from '../assets/mobiliario.jpeg';
import Musica from '../assets/musica.jpg';
import '../styles/SeleccionProducto.css';
import descuento from '../assets/image 16.png';
import { DataContext } from '../context/context'; 
import Modal from '../componentes/modal/modal';


const SeleccionProducto = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { cart, addToCart,applyDiscount } = useContext(DataContext);

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
    const productoSeleccionado = { ...productos[selectedProduct], cantidad: 1 }; 
    console.log("intentamos",productoSeleccionado)

    addToCart(productoSeleccionado.id);

    const carritoActualizado = [...cart, productoSeleccionado];
    localStorage.setItem('cartData', JSON.stringify(carritoActualizado));
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyDiscount = (codigo) => {
    console.log('Código de descuento aplicado:', codigo);
    applyDiscount(codigo);
    handleCloseModal(); 
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
        <button className="codigoDescuento" onClick={handleOpenModal}>
          <img src={descuento} alt="Ícono de Descuento" />
          Código de Descuento
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleApplyDiscount} />
  
    </div>
  );
};

SeleccionProducto.propTypes = {
  agregarAlCarrito: PropTypes.func
};

export default SeleccionProducto;
