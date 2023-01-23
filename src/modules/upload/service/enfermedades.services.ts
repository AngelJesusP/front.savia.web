// import axios from "axios"
import { IConsulta, IResponseConsulta } from "../interfaces/enfermedades.interfaces";
// import { headerAxios } from "../../../utils/constants/header.axios";

// Promise<IResponseConsulta | any> 
const URL = import.meta.env.VITE_URL
export const onClickConsultar = async (json: IConsulta) => {

    // let jsonResponse: IResponseConsulta = { message: "", type: "", hidden: false };
    // try {
    //     const { idEnfermedad, idIps } = json
    //     if (idEnfermedad === -1 || idIps === -1) {
    //         jsonResponse.message = "Acción no permitida, debe ingresar todos los campos que sean obligatorios.";
    //         jsonResponse.hidden = false;
    //         jsonResponse.type = "error"
    //         return { response: jsonResponse };
    //     } else {
    //         // const resposne = await axios.get('', headerAxios);
    //         // resposne.
    //         return { response: {} };
    //     }
    // } catch (error) {

    // }
}