import { nametoken } from "../../../utils/constants/token/nameToken"
export const IndexAuth = (username: string, password: string) => {
    let { localStorage } = window
    if (localStorage) {
        const json = {
            "user": username,
            "pass": btoa(password),
            "permissions": [],
            "roles": []
        }
        localStorage.setItem(nametoken, btoa(JSON.stringify(json)))
    } else console.error("No se puede aplicar la accion de guardar el usuario");
   
}