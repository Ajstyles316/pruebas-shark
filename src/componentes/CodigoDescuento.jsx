import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/CodigoDescuento.css'
const Descuento = ({ aplicarDescuento }) => {
  const [codigo, setCodigo] = useState("");

  const manejarAplicarDescuento = () => {
    aplicarDescuento(codigo);
  };

  return (
    <div className="transacciones">
      <h2>Aplicar Descuento</h2>
      <input
        type="text"
        placeholder="Código de Descuento"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button className="btn-aplicar" onClick={manejarAplicarDescuento}>
        Aplicar Descuento
      </button>
    </div>
  );
};

Descuento.propTypes = {
  aplicarDescuento: PropTypes.func.isRequired,
};

export default Descuento;
