import { useState } from 'react';
import SeleccionProducto from '../componentes/SeleccionProducto';
import Carrito from '../componentes/Carrito';
import Descuento from '../componentes/CodigoDescuento';
import Calificacion from '../componentes/Calificacion';
import Gracias from '../componentes/Gracias';
import '../styles/Transacciones.css'
const Transacciones = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [vistaActual, setVistaActual] = useState('seleccion'); // 'seleccion', 'carrito', 'descuento', 'calificacion', 'gracias'

  const agregarAlCarrito = (producto) => {
    setProductosCarrito((prev) => [...prev, producto]);
    setVistaActual('carrito'); // Cambia a la vista del carrito
  };

  const eliminarProducto = (productoId) => {
    setProductosCarrito((prev) => prev.filter((p) => p.id !== productoId));
  };

  const irADescuento = () => {
    setVistaActual('descuento'); // Cambia a la vista de descuento
  };

  const irACalificacion = () => {
    setVistaActual('calificacion'); // Cambia a la vista de calificación
  };

  const irGracias = () => {
    setVistaActual('gracias');
  }

  const volverAInicio = () => {
    setVistaActual('seleccion'); // Vuelve a la vista de selección de productos
    setProductosCarrito([]); // Reinicia el carrito si es necesario
  };

  const mostrarVistaActual = () => {
    switch (vistaActual) {
      case 'seleccion':
        return <SeleccionProducto agregarAlCarrito={agregarAlCarrito} />;
      case 'carrito':
        return (
          <Carrito
            productos={productosCarrito}
            eliminarProducto={eliminarProducto}
            onDescuento={irADescuento}
            onConfirmar={irACalificacion}
          />
        );
      case 'descuento':
        return (
          <Descuento
            aplicarDescuento={(codigo) => {
              console.log(`Código aplicado: ${codigo}`);
              irACalificacion();
            }}
          />
        );
      case 'calificacion':
        return <Calificacion finalizarCompra={irGracias} />;
      case 'gracias':
        return <Gracias salir={volverAInicio} />;
      default:
        return <SeleccionProducto agregarAlCarrito={agregarAlCarrito} />;
    }
  };

  return <div className="Transacciones">
    <h1>Transacciones</h1>
    {mostrarVistaActual()}</div>;
};

export default Transacciones;
