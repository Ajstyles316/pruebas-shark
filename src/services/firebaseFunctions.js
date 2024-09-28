// src/firebaseFunctions.js
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Asegúrate de importar la configuración de Firebase

// Función para agregar productos al carrito
export const agregarProductoAlCarrito = async (producto) => {
  try {
    const docRef = await addDoc(collection(db, "carrito"), producto);
    console.log("Producto agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar producto: ", e);
  }
};

// Función para obtener productos del carrito
export const obtenerProductosDelCarrito = async () => {
  const querySnapshot = await getDocs(collection(db, "carrito"));
  const productos = [];
  querySnapshot.forEach((doc) => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  return productos;
};
