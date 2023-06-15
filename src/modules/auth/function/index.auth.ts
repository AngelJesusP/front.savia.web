import { nametoken } from "../../../utils/constants/token/nameToken";
import axios from "axios";

const API_URL = import.meta.env.VITE_URLAUTH;

interface login {
  username: string;
  password: string;
}

export const IndexAuth = (username: string, password: string) => {
  let { localStorage } = window;
  if (localStorage) {
    const json = {
      user: username,
      pass: btoa(password),
      permissions: [],
      roles: [],
    };
    localStorage.setItem(nametoken, btoa(JSON.stringify(json)));
    localStorage.setItem("name", username);
  } else console.error("No se puede aplicar la acción de guardar el usuario");
};
export const authLogin = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: username,
      password: password,
    });
    return response.data as login[];
  } catch (error) {
    throw new Error("Error al cargar los perfiles");
  }
};
