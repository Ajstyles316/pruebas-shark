import { useState, useContext } from 'react';
import { DataContext } from '../context/context.jsx';
import PropTypes from 'prop-types';
import CalificarCompra from '../componentes/Calificacion.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/MetodoDePago.css'

const SeleccionarMetodoPago = ({ carrito, onCerrar }) => {
  const [metodoPago, setMetodoPago] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(true);
  const { discountedTotal, discountCode } = useContext(DataContext);

  const generarPDF = () => {
    const doc = new jsPDF();
  
    // Encabezado principal estilizado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('Resumen de Compra', 105, 15, { align: 'center' });
  
    // Línea divisoria
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 20, 190, 20);
  
    // Tabla de productos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const tablaProductos = carrito.map((producto) => [
      producto.name,
      producto.quantity,
      `${producto.precio} Bs.`,
      `${producto.quantity * producto.precio} Bs.`,
    ]);
  
    doc.autoTable({
      startY: 25,
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
        halign: 'center',
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fontSize: 12,
      },
      columnStyles: {
        0: { halign: 'left', cellWidth: 50 },
        1: { halign: 'center', cellWidth: 30 },
        2: { halign: 'center', cellWidth: 40 },
        3: { halign: 'right', cellWidth: 40 },
      },
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Precio Total']],
      body: tablaProductos,
    });
  
    // Resumen adicional
    const precioTotal = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.precio,
      0
    );
    const descuentoTexto = discountCode
      ? `Código de Descuento: ${discountCode}`
      : 'Sin descuento aplicado';
    const metodoPagoTexto = metodoPago
      ? `Método de Pago: ${metodoPago} ${
          metodoPago === 'Tarjeta' ? `(${tipoTarjeta})` : ''
        }`
      : 'Método de Pago no seleccionado';
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Resumen', 20, doc.lastAutoTable.finalY + 10);
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(descuentoTexto, 20, doc.lastAutoTable.finalY + 20);
    doc.text(
      `Precio Total con Descuento: ${discountedTotal} Bs.`,
      20,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(metodoPagoTexto, 20, doc.lastAutoTable.finalY + 40);
  
    // Pie de página estilizado
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Gracias por tu compra. ¡Esperamos verte pronto!',
      105,
      285,
      { align: 'center' }
    );
  
    // Descargar el archivo
    doc.save('resumen_compra_estilizado.pdf');
  };
  


  const handleMetodoClick = (metodo) => {
    setMetodoPago(metodo);
  };
  const handleContinuar = () => {
    if (!metodoPago || !tipoTarjeta || !numeroTarjeta || !fechaVencimiento) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }
    generarPDF();
    setMostrarCalificacion(true);
  };

  const handleCerrar = () => {
    setMostrarModal(false);
    window.location.href = '/views/Transacciones.jsx'; // Reemplaza '/transacciones' con la ruta que apunta a la vista principal  
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
    <div className='container'>
      <button className='close-button' onClick={handleCerrar}>Cerrar</button>
      <h2>Selecciona tu Método de Pago</h2>
      <button className='metodo-button' onClick={() => handleMetodoClick('Tarjeta')}>Tarjeta</button>
      {metodoPago === 'Tarjeta' && (
        <div className='input-container'>
          <select
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
          />
          <input
            type="month"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
          />
        </div>
      )}
      <button className='btn-continuar' onClick={handleContinuar}>
        Aceptar
      </button>
    </div>
  );
};

SeleccionarMetodoPago.propTypes = {
  carrito: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCerrar: PropTypes.func.isRequired,
};

export default SeleccionarMetodoPago
