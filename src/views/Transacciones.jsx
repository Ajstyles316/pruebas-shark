import { useState } from 'react';
import SeleccionProducto from '../componentes/SeleccionProducto';
import Carrito from '../componentes/Carrito';
import Calificacion from '../componentes/Calificacion'; // Componente de calificación
import '../styles/Transacciones.css';

const Transacciones = () => {
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false); // Estado para controlar la vista

  // Función que se llama al confirmar el carrito y pasar a la calificación
  const handleConfirmarCompra = () => {
    setMostrarCalificacion(true);
  };

  return (
    <div className='transacciones-container'>
      {!mostrarCalificacion ? (
        <>
          <SeleccionProducto />
          <Carrito onConfirmar={handleConfirmarCompra} /> {/* Pasar función onConfirmar */}
        </>
      ) : (
        <Calificacion onConfirmar={() => alert('Calificación confirmada')} />
      )}
    </div>
  );
};

export default Transacciones;
