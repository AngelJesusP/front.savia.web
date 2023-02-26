import { Progress } from "antd";
import { CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { useState, useEffect, FC } from "react";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import axios from "axios";
import { downloadDoc } from "../service/enfermedades.services";
const URL = import.meta.env.VITE_URL;

interface IProgressFile {
  filters: IConsulta;
}

const ProgressFile: FC<IProgressFile> = ({ filters }) => {
  const [is_visible, setIs_visible] = useState(false);
  const [resposeDoc, setResponseDoc] = useState<{
    bandera: boolean;
    valor: string;
  }>({
    bandera: false,
    valor: "0",
  });

  useEffect(() => {
    if (resposeDoc.bandera) {
      setIs_visible(false);
      download();
    }
  }, [resposeDoc]);

  const download = async () => {
    const doc = await downloadDoc(resposeDoc.valor);
    const url = window.URL.createObjectURL(
      new Blob([doc], {
        type: "blob",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", `${resposeDoc.valor}`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <button
        className="btn btn-primary mt-3 d-flex align-items-center"
        onClick={async () => {
          setIs_visible(true);
          // await getDocument(filters)
          try {
            const serverSendEvent = new EventSource(
              `${URL}/api/v1/excel/generar`
            );
            serverSendEvent.addEventListener(
              "PROCESS_GENERAR_EXCEL",
              (event) => {
                setResponseDoc(JSON.parse(event?.data.replace(/'/g, '"')));
              }
            );
            await axios.post(`${URL}/api/v1/excel/descargar`, filters);
          } catch (error) {
            Promise.reject(error);
          }
        }}
      >
        <DownloadOutlined className="me-2" />
        Exportar datos
      </button>
      {is_visible && (
        <div className="container-progress">
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              top: "5px",
              position: "absolute",
              right: "15px",
              color: "#f0f2f5",
            }}
          >
            <CloseCircleOutlined
              onClick={() => {
                setIs_visible(false);
              }}
            />
          </span>
          <Progress
            type="dashboard"
            percent={Number(resposeDoc.valor) || 0}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
          />
          <span className="text-white">Cargando...</span>
        </div>
      )}
    </>
  );
};

export default ProgressFile;
