import { useState } from 'react';
import PropTypes from 'prop-types';
import CalificarCompra from '../componentes/Calificacion.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SeleccionarMetodoPago = ({ carrito, onCerrar }) => {
  const [metodoPago, setMetodoPago] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(true);

  const handleMetodoClick = (metodo) => {
    setMetodoPago(metodo);
  };

  const handleContinuar = () => {
    if (!metodoPago || !tipoTarjeta || !numeroTarjeta || !fechaVencimiento) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }
    setMostrarCalificacion(true);
  };

  const handleCerrar = () => {
    setMostrarModal(false);
    onCerrar();
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Resumen de la Compra", 20, 10);

    const tablaProductos = carrito.map((producto) => [
      producto.name,
      producto.quantity,
      producto.precio,
      producto.quantity * producto.precio,
    ]);

    doc.autoTable({
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Precio Total']],
      body: tablaProductos,
    });

    const precioTotal = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.precio,
      0
    );
    doc.text(`Precio Total: ${precioTotal} Bs.`, 20, doc.previousAutoTable.finalY + 10);

    doc.save('resumen_compra.pdf');
  };

  const styles = {
    container: {
      display: mostrarModal ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      background: 'linear-gradient(to bottom, #f5f5f5, #ddd)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
      maxWidth: '400px',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#ff4444',
      border: 'none',
      color: 'white',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '12px',
    },
    metodoButton: {
      backgroundColor: metodoPago === 'Tarjeta' ? '#ffcc00' : '#ccc',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
      minWidth: '150px',
      textAlign: 'center',
      marginBottom: '15px',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    btnContinuar: {
      backgroundColor: '#ffcc00',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
      marginTop: '20px',
    },
    btnGenerarPDF: {
      backgroundColor: '#007bff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
      marginTop: '10px',
      color: 'white',
    },
  };

  if (mostrarCalificacion) {
    return (
      <CalificarCompra
        carrito={carrito}
        onConfirmar={() => setMostrarCalificacion(false)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.closeButton} onClick={handleCerrar}>
        Cerrar
      </button>
      <h2 style={{ marginBottom: '15px' }}>Selecciona tu Método de Pago</h2>
      <button
        style={styles.metodoButton}
        onClick={() => handleMetodoClick('Tarjeta')}
      >
        Tarjeta de Crédito/Débito
      </button>

      {metodoPago === 'Tarjeta' && (
        <div style={styles.inputContainer}>
          <select
            style={styles.input}
            value={tipoTarjeta}
            onChange={(e) => setTipoTarjeta(e.target.value)}
          >
            <option value="">Selecciona tipo de tarjeta</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
          </select>
          <input
            type="text"
            placeholder="Número de Tarjeta"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            style={styles.input}
            maxLength="16"
          />
          <input
            type="month"
            placeholder="Fecha de Vencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            style={styles.input}
          />
        </div>
      )}

      <button style={styles.btnContinuar} onClick={handleContinuar}>
        Aceptar
      </button>
    </div>
  );
};

SeleccionarMetodoPago.propTypes = {
  onMetodoSeleccionado: PropTypes.func.isRequired,
  onCerrar: PropTypes.func.isRequired,
  productoSeleccionado: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string,
  }).isRequired,
};

export default SeleccionarMetodoPago;
