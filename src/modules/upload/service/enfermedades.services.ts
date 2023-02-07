import axios from "axios";
import {
  IConsulta,
  IResponseConsulta,
} from "../interfaces/enfermedades.interfaces";

// Promise<IResponseConsulta | any>
const URL = import.meta.env.VITE_URL;
export const onClickConsultar = async (filters: IConsulta): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/consulta/paciente`,
      filters
    );
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
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
