import { useState } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { guardarCalificacion } from '../services/firebaseFunctions'; // función para guardar en Firebase

const CalificarCompra = ({ carrito, onConfirmar }) => {
  const [calificacion, setCalificacion] = useState(0);

  const handleStarClick = (rating) => {
    setCalificacion(rating);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Resumen de la Compra", 20, 10);

    const tablaProductos = carrito.map((producto) => [
      producto.name,
      producto.cantidad,
      producto.precio,
      producto.cantidad * producto.precio,
    ]);

    doc.autoTable({
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Precio Total']],
      body: tablaProductos,
    });

    const precioTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    doc.text(`Precio Total: $${precioTotal}`, 20, doc.previousAutoTable.finalY + 10);

    doc.save('resumen_compra.pdf');
  };

  const handleConfirmar = async () => {
    if (calificacion === 0) {
      alert("Por favor, califica tu experiencia antes de confirmar.");
      return;
    }

    // Guardar la calificación en la base de datos
    await guardarCalificacion(calificacion);

    // Generar el PDF
    generarPDF();

    // Proceder a la siguiente acción
    onConfirmar();
  };

  return (
    <div className="calificar-container">
      <h2>Califica tu Experiencia</h2>
      <div className="estrellas">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= calificacion ? 'estrella-seleccionada' : 'estrella'}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p>Gracias por tu Compra</p>
      <button className="btn-confirmar" onClick={handleConfirmar}>
        Confirmado
      </button>
    </div>
  );
};

CalificarCompra.propTypes = {
  carrito: PropTypes.array.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default CalificarCompra;
