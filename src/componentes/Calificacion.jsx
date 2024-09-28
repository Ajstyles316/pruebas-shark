import { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../services/firebaseConfig'; // Configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import '../styles/Calificacion.css'
const Calificacion = ({ productId, finalizarCompra }) => {
  const [calificacion, setCalificacion] = useState(0);

  const handleCalificacion = async () => {
    try {
      await addDoc(collection(db, 'calificaciones'), {
        productId,
        calificacion,
        fecha: new Date(),
      });
      alert('Calificación enviada');
    } catch (error) {
      console.error('Error al enviar la calificación:', error);
    }
    finalizarCompra(); // Vuelve a la selección después de calificar
  };

  return (
    <div className="calificacion">
      <h2>Califica tu experiencia</h2>
      <div className="estrellas">
        {[...Array(5)].map((star, index) => (
          <span
            key={index}
            onClick={() => setCalificacion(index + 1)}
            className={index < calificacion ? 'estrella llena' : 'estrella vacia'}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={handleCalificacion} className="btn-enviar">
        Enviar
      </button>
    </div>
  );
};

Calificacion.propTypes = {
  productId: PropTypes.string.isRequired,
  finalizarCompra: PropTypes.func.isRequired,
};

export default Calificacion;
