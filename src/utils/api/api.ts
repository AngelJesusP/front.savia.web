import axios from "axios"
import { pathApi } from '../endpoint/path'
import { headerAxios, headerAxiosFile } from "../constants/header.axios";
const endpoint: pathApi = new pathApi();

const URL = import.meta.env.VITE_URL

export const getListEnfermedades = async (): Promise<any> => {
    const response = await axios.get(`${URL}${endpoint.PATH_LOAD_ENFERMEDADES}`, headerAxios)
    return response;
}

export const HttpClientPostFile = async (file: any):Promise<any> => {
    let form = new FormData();
    form.append("idEnfermedad", "1");
    form.append("idIps", "2");
    form.append("file", file);

    const response = await axios.post(`${URL}${endpoint.PATH_UPLOAD_DIRECT}`, form, headerAxiosFile)
    return response;
}


export const dataTestForDatatable = async (bandera: boolean, id: number) => {
    let dataTable: any = []
    await axios.get(`${URL}${(bandera) ? endpoint.PATH_PACIENTE : endpoint.PATH_DETALLE + `/${id}`}`).then(({ data }) => {
        dataTable = data.data
    })
    return { dataTable }
}


