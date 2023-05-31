import { RUTA_CARGA, RUTA_CONSULTA, RUTA_HOME, RUTA_REPORTES } from "../router/router.router"

interface itemLeftPanel {
    name: string
    ruta: string
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
        ruta: RUTA_CONSULTA
    },
    {
        name: "Soportes",
        ruta: RUTA_REPORTES
    },
]