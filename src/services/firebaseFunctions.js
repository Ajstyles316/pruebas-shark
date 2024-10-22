import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from './firebaseConfig';

export const addProductToCart = async (product) => {
  try {
    await addDoc(collection(db, "carrito"), product);
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

export const actualizarProductoEnCarrito = async (productId, data) => {
  const productRef = doc(db, "carrito", productId);
  try {
    await updateDoc(productRef, data);
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

export const eliminarProductoDelCarrito = async (productoId) => {
  const productRef = doc(db, "carrito", productoId);
  try {
    await deleteDoc(productRef);
    console.log("Producto eliminado correctamente");
  } catch (error) {
    console.error("Error eliminando el producto:", error);
  }
};

export const obtenerProductosDelCarrito = async () => {
  const querySnapshot = await getDocs(collection(db, "carrito"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const guardarCalificacion = async (calificacion) => {
  try {
    await addDoc(collection(db, "calificaciones"), {
      calificacion,
      fecha: new Date(),
    });
  } catch (error) {
    console.error("Error guardando la calificación:", error);
  }
};