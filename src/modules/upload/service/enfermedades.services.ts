import axios from "axios";
import {
  IConsulta,
  IResponseConsulta,
} from "../interfaces/enfermedades.interfaces";
// import { headerAxios } from "../../../utils/constants/header.axios";

// Promise<IResponseConsulta | any>
const URL = import.meta.env.VITE_URL;
export const onClickConsultar = async (filters: IConsulta): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/api/v1/consulta/paciente`,
      filters
    );
    console.log("respuesta del servidor", response);

    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
