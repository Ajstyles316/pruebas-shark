import { useState } from 'react';
import gracias from '../assets/Icon.png';
import PropTypes from 'prop-types';
import { guardarCalificacion } from '../services/firebaseFunctions';

const CalificarCompra = ({ carrito, onConfirmar }) => {
  const [calificacion, setCalificacion] = useState(0);

  const handleStarClick = (rating) => {
    setCalificacion(rating);
  };


  const handleConfirmar = async () => {
    if (calificacion === 0) {
      alert("Por favor, califica tu experiencia antes de confirmar.");
      return;
    }

    await guardarCalificacion(calificacion);
    onConfirmar(); 
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      background: 'linear-gradient(to bottom, #d9d9d9)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
    },
    estrellas: {
      display: 'flex',
      justifyContent: 'center',
      margin: '15px 0',
    },
    estrella: {
      fontSize: '30px',
      cursor: 'pointer',
      margin: '0 5px',
      transition: 'color 0.3s ease',
    },
    btnConfirmar: {
      backgroundColor: '#ffcc00',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
    },
    btnCerrar: {
      marginTop: '10px',
      backgroundColor: '#ff5e5e',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '15px' }}>Califica tu Experiencia</h2>
      <div style={styles.estrellas}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...styles.estrella,
              color: star <= calificacion ? 'gold' : '#ccc',
            }}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <div className='gracias'>
        <img src={gracias} alt='Gracias' />
      </div>
      <p>Gracias por tu Compra</p>
      <button
        style={styles.btnConfirmar}
        onClick={handleConfirmar}
      >
        Confirmar
      </button>
      <button
        style={styles.btnCerrar}
        onClick={onConfirmar} 
      >
        Cerrar
      </button>
    </div>
  );
};

CalificarCompra.propTypes = {
  carrito: PropTypes.array.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default CalificarCompra;
