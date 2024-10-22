import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [codigo, setCodigo] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(codigo); 
    setCodigo('');
  };

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ingresa tu Código de Descuento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de descuento"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Aplicar</button>
            <button type="button" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
