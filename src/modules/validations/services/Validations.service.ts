import axios from "axios";
import { pathApi } from "../../../utils/endpoint/path";
const endpoint: pathApi = new pathApi();
const URL2 = import.meta.env.VITE_URL2;

export const getListVariables = async (idEnfermedad: number): Promise<any> => {
  const response = await axios.get(`${URL2}${endpoint.PATH_LOAD_VARIABLES}`, {
    params: {
      idEnfermedad,
    },
  });
  return response;
};
