import { useState } from "react";
import PropTypes from "prop-types";

const Descuento = ({ navegar }) => {
  const [codigo, setCodigo] = useState("");

  const aplicarDescuento = () => {
    if (codigo === "VALIDO") {
      alert("Descuento aplicado con éxito");
      navegar("calificacion");
    } else {
      alert("Código de descuento inválido");
    }
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
      <button className="btn-aplicar" onClick={aplicarDescuento}>
        Aplicar Descuento
      </button>
    </div>
  );
};

// Validación de props
Descuento.propTypes = {
  navegar: PropTypes.func.isRequired,
};

export default Descuento;
