import axios from "axios";
import { swal } from "../../../utils/components/SwalAlert";
import { IFiltersFolders } from "../types/Reports.type";
import moment from "moment";
import { log } from "console";

const URL = import.meta.env.VITE_URL;

export const createFolders = async (
  claveArchivo: string,
  idEnfermedad: Number
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
      `${URL}/api/v1/soportes`,
      {},
      {
        params: {
          isDirectory: true,
          nombreNuevo,
          stringListDirectorios,
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
  console.log(stringListDirectorios, " , ", listFolders);
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
  formData.append("stringListDirectorios", claveArchivo);
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
        stringListDirectorios: Data,
        //numeroDocumento,
      },
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteFolderOrFile = async (
  stringListDirectorios: string,
  listFolders: string | number
): Promise<any> => {
  console.log(stringListDirectorios, listFolders);
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

/* para borrar una carpeta el stringListDirectorios = 7;2023-05
y el listFolders es el numero de la carpeta

Para borrar un archivo el stringListDirectorios = 7;2023-05;123456(Numero de la carpeta)
y el listFolders es el nombre del archivo .pdf
*/
