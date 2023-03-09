import {
  Card,
  Form,
  Input,
  Collapse,
  Popover,
  Upload,
  UploadProps,
  message,
  Button,
} from "antd";
import {
  FilePdfOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import {
  deleteFolders,
  getFilesForFolder,
  getFolders,
  saveFilesInFolder,
  updateNameFolder,
} from "../service/reports.service";
import { swal } from "../../../utils/components/SwalAlert";

export const ListReports = () => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const [folders, setFolders] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [clave, setClave] = useState("");
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const props: UploadProps = {
    name: "file",
    // accept: '.pdf',
    // action: "/api/v1/soportes/carga/archivos",
    // headers: {
    //   authorization: "authorization-text",
    // },
    beforeUpload: async (values) => {
      return false;
    },
    onChange: async (info) => {
      await saveFilesInFolder(info.file, clave, "1015075197");
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChange = async (key: string | string[]) => {
    if (typeof key === "string") {
      await getFilesForFolder(clave, key.trim());
    }
  };

  const genExtra = (folder: any) => {
    return (
      <div>
        <Popover
          content={
            <>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Subir archivo</Button>
              </Upload>
              {/* <div className="d-flex justify-content-end mt-2">
                <button
                  className="btn btn-primary me-2"
                  onClick={async () => {
                    await editReport(folder);
                  }}
                >
                  Actualizar
                </button>
                <button className="btn btn-outline-primary">Cancelar</button>
              </div> */}
            </>
          }
          title="Cambiar nombre carpeta"
          trigger="click"
        >
          <UploadOutlined className="me-2" />
        </Popover>

        <Popover
          content={
            <>
              <Input
                type="text"
                defaultValue={folder}
                onChange={({ target }) => {
                  setValueInput(target.value);
                }}
              />
              <div className="d-flex justify-content-end mt-2">
                <button
                  className="btn btn-primary me-2"
                  onClick={async () => {
                    await editReport(folder);
                  }}
                >
                  Actualizar
                </button>
                <button className="btn btn-outline-primary">Cancelar</button>
              </div>
            </>
          }
          title="Cambiar nombre carpeta"
          trigger="click"
        >
          <EditOutlined className="me-2 text-info" />
        </Popover>

        <DeleteOutlined
          className="text-danger"
          onClick={async () => deleteReport(folder)}
        />
      </div>
    );
  };

  const onSubmit = async (values: any) => {
    const resp = await getFolders(values?.claveArchivo);
    console.log("respuesta del servicio", resp.data[0]);
    setFolders(resp?.data[0]?.replace(/[\[\]]/g, "").split(","));
    setClave(values?.claveArchivo);
  };

  const editReport = async (folder: any) => {
    await updateNameFolder(clave, folder, valueInput || folder);
    await onSubmit({ claveArchivo: clave });
  };

  const deleteReport = async (folder: number) => {
    const result = await swal.fire({
      title: "¿Estás seguro de eliminar esta carpeta?",
      text: "¡No podrás devolver los cambios realizados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    });
    if (result.isConfirmed) {
      await deleteFolders(clave, folder);
      await onSubmit({ claveArchivo: clave });
      await swal.fire(
        "¡Eliminado exitosamente!",
        "Esta carpeta ha sido eliminada",
        "success"
      );
    }
  };

  return (
    <>
      <Card
        title="filtros"
        className="mt-3"
        actions={[
          <button
            key="button-search"
            onClick={() => {
              form.submit();
            }}
            className="btn btn-primary "
            type="submit"
          >
            Buscar
          </button>,
        ]}
      >
        <Form
          name="ReportsFilters"
          layout="vertical"
          colon={false}
          onFinish={onSubmit}
          form={form}
        >
          <div className="row align-items-center">
            <div className="col-12">
              <Form.Item name="claveArchivo" noStyle>
                <Input placeholder="Clave del archivo" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>

      <Card title="Reportes" className="mt-3">
        <Collapse
          accordion
          onChange={onChange}
          expandIconPosition={expandIconPosition}
        >
          {folders?.map((folder: string | number, index: number) => {
            return (
              <Panel header={folder} key={folder} extra={genExtra(folder)}>
                <div className="d-flex justify-content-between">
                  <div>
                    <FilePdfOutlined className="me-2" />
                    <span>Nombre del pdf</span>
                  </div>
                  <div>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => deleteReport(1)}
                    />
                  </div>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </Card>
    </>
  );
};
