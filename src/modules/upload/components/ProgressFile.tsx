import { DownloadOutlined, SyncOutlined } from "@ant-design/icons";
import { useState, FC } from "react";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import axios from "axios";
import { downloadDoc } from "../service/enfermedades.services";
const URL = import.meta.env.VITE_URL;

interface IProgressFile {
    filters: IConsulta;
}

const ProgressFile: FC<IProgressFile> = ({ filters }) => {

    const [getSpinner, setSpinner] = useState(false)

    const download = async (nombreArchivo: string) => {
        const doc = await downloadDoc(nombreArchivo);
        const url = window.URL.createObjectURL(
            new Blob([doc], {
                type: "blob",
            })
        );
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", `${nombreArchivo}`);
        document.body.appendChild(link);
        link.click();
        setSpinner(false)
    };


    const setEventSource = async () => {
        setSpinner(true)
        try {
            await axios.post(`${URL}/api/v1/excel/descargar`, filters).then(({ data }) => {
                const nombreArchivo = data;
                if (nombreArchivo != null) {
                    download(nombreArchivo)
                } else alert("No se puede procesar el archivo para descargar")
            })
        } catch (error) {
            Promise.reject(error);
        }
    }

    return (
        <>
            <button
                className="btn btn-primary mt-3 d-flex align-items-center"
                onClick={async () => await setEventSource()}>
                {getSpinner ? <SyncOutlined spin  className="me-2" />  : <DownloadOutlined className="me-2" /> }
                {getSpinner ? 'Espere...'  : 'Exportar datos' }                
            </button>
        </>
    );
};

export default ProgressFile;
