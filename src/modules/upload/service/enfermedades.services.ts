import axios from "axios";
import { IConsulta } from "../interfaces/enfermedades.interfaces";

const URL = import.meta.env.VITE_URL;

export const getPaciente = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/consulta/detalle/${id}`);
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getLogErrors = async (filters: IConsulta): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/consulta/log/errores`,
      filters
    );
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const downloadDoc = async (nameFile: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/exportar/excel`, {
      responseType: "blob",
      params: {
        file: nameFile,
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getNews = async (idEnfermedad: number): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/enfermedades/novedades/`, {
      params: {
        idEnfermedad
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};


