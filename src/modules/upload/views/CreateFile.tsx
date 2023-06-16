import React from "react";
import { Select, Tag, Upload, Alert, Spin, Card } from "antd";
import { LoadingOutlined, InboxOutlined } from "@ant-design/icons";
import {
  getListEnfermedades,
  HttpClientPostFile,
} from "../../../utils/api/api";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import { MyState } from "../types/UploadFile.type";
import { convertListToSelect } from "../../../utils/constants/convertToList";
const { Dragger } = Upload;
import { swal } from "../../../utils/components/SwalAlert";

export default class CreateFile extends React.Component {
  state: MyState = {
    listEnfermedades: [],
    message: "",
    typeres: "error",
    openResponse: false,
    idEnfermedad: null,
    fileEnviar: null,
    nameFile: "",
    openTag: false,
    loading: false,
  };

  componentDidMount = async () => {
    await this.getListEnfermedades();
  };

  getListEnfermedades = async () => {
    await getListEnfermedades().then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        const list: Ienfermedades[] = data.data;
        const { convert } = convertListToSelect(list);
        this.setState({ listEnfermedades: convert });
      }
    });
  };

  getAlertMessage = () => {
    const { message, typeres } = this.state;
    return (
      <Alert
        message={message}
        type={typeres}
        style={{ marginTop: 10 }}
        showIcon
      />
    );
  };

  onClickEnviarArchivo = async () => {
    const name = localStorage.getItem("name");
    this.setState({ loading: true });
    const { idEnfermedad, fileEnviar } = this.state;
    let type = undefined;
    let message = "";
    if (idEnfermedad && fileEnviar !== null) {
      const response = await HttpClientPostFile(`${idEnfermedad}`, name, fileEnviar);
      const data = response.data;
      if (data) {
        const { status } = data;
        if (status === 400) {
          this.setState({
            loading: false,
            fileEnviar: null,
            idEnfermedad: null,
            nameFile: "",
            openTag: false,
          });
          return await swal.fire({
            title: "Error, no se puede procesar",
            text: data?.message || "Tipo de archivo no permitido",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }

        if (status == 200) type = "success";
        else if (status == 500) type = "error";
        else type = "warning";
        message = data.message;
      }
      this.setState({
        fileEnviar: null,
        idEnfermedad: null,
        nameFile: "",
        openTag: false,
        openResponse: false,
      });
      await swal.fire({
        title: "¡Archivo subido exitosamente!",
        text: "en este momento su archivo esta siendo leído.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      message =
        "Acción no permitida, Debe llenar todos los campos y seleccionar un archivo.";
      this.setState({
        message: message,
        typeres: type,
        openResponse: true,
      });
    }
    this.setState({ loading: false });
  };

  /* Esta es una función que devuelve una alerta de componente. */
  getFile = (file: any) => {
    const file_type = file.type.split("/").pop()?.toLowerCase();
    if (file_type === "csv") {
      return this.setState({
        nameFile: file.name,
        openTag: true,
        fileEnviar: file,
        message: "",
        typeres: "",
        openResponse: false,
      });
    } else {
      return this.setState({
        message:
          "El tipo de archivo no es permitido, por favor sube un archivo .csv",
        typeres: "error",
        openResponse: true,
      });
    }
  };

  render() {
    const { listEnfermedades, openResponse, nameFile, openTag } = this.state;
    return (
      <div className="container-fluid mt-3">
        <Card
          actions={[
            <div
              key="actions-button"
              className="d-flex justify-content-end me-4"
            >
              <button
                className="btn btn-outline-primary me-3"
              >
                Cancelar
              </button>
              <button
                onClick={this.onClickEnviarArchivo}
                className="btn btn-primary"
                disabled={this.state.loading}
              >
                <div className="d-flex align-items-center">
                  Realizar carga
                  {this.state.loading && (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          className="text-white ms-2"
                          style={{ fontSize: "14px" }}
                        />
                      }
                    />
                  )}
                </div>
              </button>
            </div>,
          ]}
        >
          <span style={{ font: "normal normal normal 13px/13px Montserrat" }}>
            Carga de archivo .csv
          </span>
          <hr style={{ position: "relative", bottom: 10 }} />

          <div className="row">
            <div className="col-6">
              <span style={{ font: "normal normal 600 12px/15px Montserrat" }}>
                Seleccionar una enfermedad{" "}
              </span>
              <Select
                className="w-100"
                showSearch
                value={this.state.idEnfermedad}
                placeholder="Selecciona la enfermedad"
                optionFilterProp="children"
                onChange={(value) => this.setState({ idEnfermedad: value })}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={listEnfermedades}
              />
            </div>
            {/* <div className="col-6">
              <span style={{ font: "normal normal 600 12px/15px Montserrat" }}>
                Seleccionar el prestador
              </span>
              <Select
                className="w-100"
                showSearch
                placeholder="Selecciona el prestador"
                optionFilterProp="children"
                options={[]}
              />
            </div> */}
          </div>
          <br />
          <Dragger
            name="file"
            accept=".csv"
            multiple={false}
            showUploadList={false}
            action={import.meta.env.VITE_URL}
            beforeUpload={(e) => {
              this.getFile(e);
              return false;
            }}>
            <InboxOutlined style={{ color: "#244c5c", fontSize: "50px" }} />
            <p className="ant-upload-text">
              Haga clic o arrastre el archivo para ser cargado
            </p>
            <p className="ant-upload-hint">
              Soporte para una carga única o masiva. Prohibir estrictamente la
              carga de datos de la empresa u otros
            </p>
          </Dragger>
          {openTag ? (
            <Tag style={{ marginTop: 10 }} color="green">
              NOMBRE DEL ARCHIVO : {nameFile}
            </Tag>
          ) : null}
          {openResponse ? this.getAlertMessage() : null}
        </Card>
      </div>
    );
  }
}
