
import { useState } from 'react';
// Componentes individuales
import SeleccionProducto from './componentes/SeleccionProducto';
import Carrito from './componentes/Carrito';
import Descuento from './componentes/CodigoDescuento';
import Calificacion from './componentes/Calificacion';
import Gracias from './componentes/Gracias';

const App = () => {
  const [step, setStep] = useState('seleccion'); // Estado para controlar la navegación
  const [cartItems, setCartItems] = useState([]);
  const [calificacion, setCalificacion] = useState(0); // Calificación del usuario
  const [setDescuentoAplicado] = useState(false);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCartItems([...cartItems, producto]);
    setStep('carrito'); // Navegar al carrito
  };

  // Función para aplicar el descuento
  const aplicarDescuento = (codigo) => {
    if (codigo === 'DESCUENTO10') {
      setDescuentoAplicado(true);
    }
    setStep('calificacion'); // Ir a la sección de calificación
  };

  // Función para finalizar la compra y mostrar agradecimiento
  const finalizarCompra = () => {
    setStep('gracias');
  };

  return (
    <div className="app-container">
      {step === 'seleccion' && (
        <SeleccionProducto agregarAlCarrito={agregarAlCarrito} />
      )}

      {step === 'carrito' && (
        <Carrito
          cartItems={cartItems}
          onDescuento={() => setStep('descuento')}
          onConfirmar={() => setStep('calificacion')}
        />
      )}

      {step === 'descuento' && (
        <Descuento aplicarDescuento={aplicarDescuento} />
      )}

      {step === 'calificacion' && (
        <Calificacion
          onFinalizar={finalizarCompra}
          calificacion={calificacion}
          setCalificacion={setCalificacion}
        />
      )}

      {step === 'gracias' && <Gracias />}
    </div>
  );
};

export default App;
