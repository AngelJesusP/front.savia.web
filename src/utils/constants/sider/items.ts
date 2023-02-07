import { RUTA_CONSULTA } from "../router/router.router"

interface itemLeftPanel {
    name: string
    ruta: string
}

export const listItems: itemLeftPanel[] = [
    {
        name: "Carga de archivo .csv",
        ruta: ""
    },
    {
        name: "Consultar datos cargados",
        ruta: RUTA_CONSULTA
    },
    {
        name: "Log de errores de carga",
        ruta: ""
    },
    {
        name: "Nueva enfermedad",
        ruta: ""
    }
]