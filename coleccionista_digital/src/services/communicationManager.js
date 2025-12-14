import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

export const searchAnime = async (query) => {
  try {
    const response = await instance.get("/anime", {
      params: {
        q: query,
        order_by: "score",
        sort: "desc",
        limit: 25,
      },
    });
    return response.data.data; // Ajusta según la estructura de la respuesta de la API
  } catch (error) {
    console.error("Error buscando anime:", error);
    throw error;
  }
};

// Funciones para guardar y recuperar datos en localStorage
export const saveToLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
};

export const getFromLocal = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error obteniendo de localStorage:", error);
    return null;
  }
};

export const removeFromLocal = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error eliminando de localStorage:", error);
  }
};
