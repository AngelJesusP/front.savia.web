import axios from "axios";
import { swal } from "../../../utils/components/SwalAlert";
import { IFiltersFolders } from "../types/Reports.type";

// Promise<IResponseConsulta | any>
const URL = import.meta.env.VITE_URL;

export const createFolders = async (claveArchivo: string, idEnfermedad: Number): Promise<any> => {
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

export const getFolders = async (claveArchivo: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/soportes/listar/carpetas`, {
      params: {
        claveArchivo,
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateNameFolder = async (
  claveArchivo: string,
  numeroDocumento: string | number,
  nombreNuevo: string | number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/soportes/renombrar/carpetas`,
      {},
      {
        params: {
          claveArchivo,
          numeroDocumento,
          nombreNuevo,
        },
      }
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteFolders = async (
  claveArchivo: string,
  listFolders: string | number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/soportes/eliminar/carpetas`,
      {},
      {
        params: {
          claveArchivo,
          listFolders,
        },
      }
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const saveFilesInFolder = async (
  _file: any,
  claveArchivo: string,
  numeroDocumento: string
): Promise<any> => {
  const formData: FormData = new FormData();
  formData.append("files", _file);
  formData.append("claveArchivo", claveArchivo);
  formData.append("numeroDocumento", numeroDocumento);
  try {
    const response = await axios.post(
      `${URL}/api/v1/soportes/carga/archivos`,
      formData,
      {
        headers: {
          authorization: "authorization-text",
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getFilesForFolder = async (
  claveArchivo: string,
  numeroDocumento: string | number
): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/api/v1/soportes/listar/archivos`, {
      params: {
        claveArchivo,
        numeroDocumento,
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteFolderOrFile = async (
  claveArchivo: string,
  numeroDocumento: string | number,
  listFiles: any
): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/soportes/eliminar/archivos`,{},
      {
        params: {
          claveArchivo,
          numeroDocumento,
          listFiles,
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
