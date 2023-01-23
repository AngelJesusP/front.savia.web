import { Navigate } from "react-router-dom"
import { nametoken } from "../constants/token/nameToken"

export const ProtectedRoute = ({children}:any) => {

    const { localStorage } = window
    if (localStorage) {
        if (!localStorage.getItem(nametoken)) {
            return <Navigate to="/savia/login" />
        }

        /* Validar los permissos y roles */
        // ... code body
    }

    return children
}