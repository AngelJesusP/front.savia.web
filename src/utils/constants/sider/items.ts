import {
  CONSULTAR_CARGUE,
  RUTA_CARGA,
  RUTA_CONSULTA,
  RUTA_HOME,
  RUTA_REPORTES,
  CREAR_USUARIO
} from "../router/router.router";

interface itemLeftPanel {
  name: string;
  ruta: string;
}

export const listItems: itemLeftPanel[] = [
  {
    name: "Página principal",
    ruta: RUTA_HOME,
  },
  {
    name: "Carga de archivo .csv",
    ruta: RUTA_CARGA,
  },
  {
    name: "Consultar datos cargados",
    ruta: RUTA_CONSULTA,
  },
  {
    name: "Soportes",
    ruta: RUTA_REPORTES,
  },
  // {
  //   name: "Consultar cargues",
  //   ruta: CONSULTAR_CARGUE,
  // },
  // {
  //   name: "Registro de usuario",
  //   ruta: CREAR_USUARIO,
  // },
];
export const listItemsAdmin: itemLeftPanel[] = [
  {
    name: "Página principal",
    ruta: RUTA_HOME,
  },
  {
    name: "Consultar cargues",
    ruta: CONSULTAR_CARGUE,
  },
  {
    name: "Registro de usuario",
    ruta: CREAR_USUARIO,
  },
];
