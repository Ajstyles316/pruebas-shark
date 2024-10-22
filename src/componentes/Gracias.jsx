import PropTypes from 'prop-types';
import '../styles/Gracias.css'; // Asegúrate de tener este archivo CSS para el estilo

const Gracias = ({ salir }) => {
  return (
    <div className="gracias-container">
      <div className="gracias-card">
        <div className="icono-verificacion">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
            <path fill="none" stroke="#000" strokeWidth="2" d="M3 13l4 4L19 7" />
          </svg>
        </div>
        <h2>Gracias por tu Compra</h2>
        <button className="btn-salir" onClick={salir}>
          Salir
        </button>
      </div>
    </div>
  );
};

// Validación de props
Gracias.propTypes = {
  salir: PropTypes.func.isRequired, // Función para redirigir a SeleccionProducto
};

export default Gracias;
