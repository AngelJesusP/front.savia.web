import axios from "axios";
import { swal } from "../../../utils/components/SwalAlert";

const URL = import.meta.env.VITE_URL;

export const createFolders = async (
  claveArchivo: string,
  idEnfermedad: number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/soportes/creacion/automatica/carpetas/`,
      {},
      {
        params: { claveArchivo, idEnfermedad },
      }
    );
    await swal.fire({
      title: "¡Creación exitosa!",
      text: `${response.data.message}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getReports = async (Data: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/soportes`, {
      params: { stringListDirectorios: Data },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateNameFolder = async (
  stringListDirectorios: string,
  nombreNuevo: string | number
): Promise<any> => {
  try {
    const response = await axios.put(
      `${URL}/api/v1/soportes`, {},
      {
        params: {
          isDirectory: true,
          nombreNuevo, stringListDirectorios,
        },
      }
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteFolders = async (
  stringListDirectorios: string,
  listFolders: string | number
): Promise<any> => {
  try {
    const response = await axios.delete(`${URL}/api/v1/soportes`, {
      params: {
        stringListDirectorios,
        listFolders,
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const saveFilesInFolder = async (
  _file: any,
  claveArchivo: string
): Promise<any> => {
  const formData: FormData = new FormData();
  formData.append("files", _file);
  formData.append("stringListDirectorios", claveArchivo.trim());
  try {
    const response = await axios.post(`${URL}/api/v1/soportes`, formData, {
      headers: {
        authorization: "authorization-text",
      },
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getFilesForFolder = async (
  claveArchivo: string,
  numeroDocumento: string | number
): Promise<any> => {
  const Data = `${claveArchivo};${numeroDocumento}`;
  try {
    const response = await axios.get(`${URL}/api/v1/soportes`, {
      params: {
        stringListDirectorios: Data
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getFilesToViewForFolder = async (
  claveArchivo: string,
  nombreDocumento: string | number
): Promise<any> => {
  const Data = `${claveArchivo};${nombreDocumento}`;
  try {
    const response = await axios.get(`${URL}/api/v1/soportes/pdf`, {
      params: {
        stringListDirectorios: Data,
      },
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteFolderOrFile = async (
  stringListDirectorios: string,
  listFolders: string | number
): Promise<any> => {
  try {
    const response = await axios.delete(`${URL}/api/v1/soportes`, {
      params: {
        stringListDirectorios,
        listFolders,
      },
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};