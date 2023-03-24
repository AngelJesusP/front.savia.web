import { nametoken } from "../../../utils/constants/token/nameToken";
/**
 * Esta función toma un nombre de usuario y una contraseña y los guarda en localStorage.
 * @param {string} username - cadena,
 * @param {string} password - cadena
 */
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
  } else console.error("No se puede aplicar la acción de guardar el usuario");
};
