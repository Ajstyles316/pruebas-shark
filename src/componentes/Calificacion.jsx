import { useState } from 'react';
import { db } from '../services/firebaseConfig'; // Configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import '../styles/Calificacion.css';
const Calificacion = ({ productId }) => {
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
  };

  return (
    <div className="calificacion">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          onClick={() => setCalificacion(index + 1)}
          className={index < calificacion ? 'estrella llena' : 'estrella vacia'}
        >
          ★
        </span>
      ))}
      <button onClick={handleCalificacion}>Enviar</button>
    </div>
  );
};
Calificacion.propTypes = {
    productId: PropTypes.string.isRequired, // Definir el tipo y si es obligatorio
  };
export default Calificacion;
