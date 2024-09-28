import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Function to retrieve products from Firebase
export const obtenerProductosDelCarrito = async () => {
  const productosSnapshot = await getDocs(collection(db, 'productos'));
  const productosList = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return productosList;
};

// Function to add a product to Firebase (Optional, if required)
export const agregarProductoAlCarrito = async (producto) => {
  await addDoc(collection(db, 'productos'), producto);
};

// Function to remove a product from Firebase
export const eliminarProductoDelCarrito = async (productoId) => {
  await deleteDoc(doc(db, 'productos', productoId));
};

