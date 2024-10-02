import { db } from './firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const obtenerProductos = async () => {
  const productosSnapshot = await getDocs(collection(db, 'productos')); // Reemplaza 'productos' con tu colección de Firebase
  const productos = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return productos;
};
export const obtenerProductosDelCarrito = async () => {
  const productosSnapshot = await getDocs(collection(db, 'carrito'));
  const productosList = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return productosList;
};

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (producto) => {
  await addDoc(collection(db, 'carrito'), producto);
};

// Actualizar un producto en el carrito
export const actualizarProductoEnCarrito = async (productoId, nuevosDatos) => {
  const productoRef = doc(db, 'carrito', productoId);
  await updateDoc(productoRef, nuevosDatos);
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (productoId) => {
  const productoRef = doc(db, 'carrito', productoId);
  await deleteDoc(productoRef);
};
