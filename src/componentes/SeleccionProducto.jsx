import { useState} from 'react';
import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/SeleccionProducto.css'
const ProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const productos = [
    { id: 1, name: 'Mesa de Banquete', precio: 50, imagen: 'url-de-la-imagen-1' },
    { id: 2, name: 'Decoración Floral', precio: 60, imagen: 'url-de-la-imagen-2' }
  ];

  const cambiarProducto = (direccion) => {
    if (direccion === 'next') {
      setSelectedProduct((prev) => (prev + 1) % productos.length);
    } else {
      setSelectedProduct((prev) => (prev - 1 + productos.length) % productos.length);
    }
  };

  const agregarAlCarrito = async () => {
    try {
      await addDoc(collection(db, 'carrito'), {
        productoId: productos[selectedProduct].id,
        nombre: productos[selectedProduct].name,
        precio: productos[selectedProduct].precio,
        imagen: productos[selectedProduct].imagen
      });
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error("Error al agregar al carrito: ", error);
    }
  };

  return (
    <div className="transacciones">
      <h2>Selección de Producto</h2>
      <div className="product-selection">
        <button onClick={() => cambiarProducto('prev')} className="arrow-btn">←</button>
        <img src={productos[selectedProduct].imagen} alt={productos[selectedProduct].name} />
        <button onClick={() => cambiarProducto('next')} className="arrow-btn">→</button>
      </div>
      <div className="checkbox">
        <input type="checkbox" id="confirmado" />
        <label htmlFor="confirmado">Colocar en confirmado</label>
      </div>
      <button className="btn-agregar" onClick={agregarAlCarrito}>Agregar al Carrito</button>
      <button className="btn-cancelar">Cancelar</button>
    </div>
  );
};

export default ProductSelection;