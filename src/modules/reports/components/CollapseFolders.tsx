import React, { FC, useState } from "react";
import {
  Button,
  Collapse,
  Empty,
  Input,
  message,
  Popover,
  Upload,
  UploadProps,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  deleteFolderOrFile,
  deleteFolders,
  getFilesForFolder,
  saveFilesInFolder,
  updateNameFolder,
} from "../service/reports.service";
import { swal } from "../../../utils/components/SwalAlert";

/* Definición de los props que recibirá el componente. */
interface ICollapse {
  clave: string;
  listFolders: (values: any) => Promise<any>;
  folders: any[];
}

export const CollapseFolders: FC<ICollapse> = ({
  clave,
  listFolders,
  folders,
}) => {
  const { Panel } = Collapse;
  const [listFiles, setListFiles] = useState([]);
  const [valueInput, setValueInput] = useState("");

  /* Un accesorio que se pasa al componente Upload. */
  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    beforeUpload: async (values) => {
      return false;
    },
  };

  //methods folder

  /**
   * EditFolder es una función que toma una carpeta como argumento y devuelve una promesa que actualiza
   * el nombre de la carpeta y luego enumera las carpetas.
   * @param {any} folder - cualquiera =&gt; el nombre de la carpeta
   */
  const editFolder = async (folder: any) => {
    await updateNameFolder(
      clave,
      folder.trim(),
      valueInput.trim() || folder.trim()
    );
    await listFolders({ claveArchivo: clave });
  };

  /**
   * Trata de eliminar una carpeta de una lista de carpetas y luego actualizar la lista de
   * carpetas.
   * @param {string} folder - cadena =&gt; El nombre de la carpeta que se va a eliminar.
   */
  const deleteFolder = async (folder: string) => {
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
      await deleteFolders(clave, folder.trim());
      await listFolders({ claveArchivo: clave });
      await swal.fire(
        "¡Eliminado exitosamente!",
        "Esta carpeta ha sido eliminada",
        "success"
      );
    }
  };

  //methods files

  /**
   * "Si la clave es una cadena, obtenga los archivos para la carpeta y, si los datos de respuesta no
   * están vacíos, establezca los archivos de lista en los datos de respuesta; de lo contrario,
   * establezca los archivos de lista en una matriz vacía".
   * </código>
   * @param {string | string[]} key - cadena | cadena[]
   */
  const getFiles = async (key: string | string[]) => {
    if (typeof key === "string") {
      const resp = await getFilesForFolder(clave, key.trim());
      if (resp.data[0]?.replace(/[\[\]]/g, "")) {
        setListFiles(resp.data[0]?.replace(/[\[\]]/g, "").split(","));
      } else {
        setListFiles([]);
      }
    }
  };

  const createFiles = async (
    info: UploadChangeParam<UploadFile<any>>,
    folder: string
  ) => {
    const resp = await saveFilesInFolder(info.file, clave, folder.trim());
    if (info.file.status !== "uploading") {
    }
    if (resp.status === 200) {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // const confirm = (e: React.MouseEvent<HTMLElement>) => {
  //   message.success("Click on Yes");
  // };

  // const cancel = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log(e);
  //   message.error("Click on No");
  // };

  const genExtra = (folder: any) => {
    return (
      <div>
        <Popover
          content={
            <>
              <Upload
                {...props}
                onChange={async (info) => {
                  await createFiles(info, folder);
                  await getFiles(folder);
                }}
              >
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
                    await editFolder(folder);
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
          onClick={async () => deleteFolder(folder)}
        />
      </div>
    );
  };

  return (
    <>
      {folders?.length > 0 ? (
        <Collapse accordion onChange={getFiles} collapsible="icon">
          {folders?.map((folder: string, index: number) => (
            <Panel header={folder} key={folder} extra={genExtra(folder)}>
              {listFiles.length > 0
                ? listFiles.map((fileName: string) => (
                    <div
                      key="document-div"
                      className="d-flex justify-content-between"
                    >
                      <div>
                        <FilePdfOutlined className="me-2" />
                        <span>{fileName}</span>
                      </div>
                      <div>
                        <DeleteOutlined
                          className="text-danger"
                          onClick={async () => {
                            await deleteFolderOrFile(
                              clave,
                              folder.trim(),
                              fileName.trim()
                            );
                            await getFiles(folder);
                          }}
                        />
                      </div>
                    </div>
                  ))
                : "No existen documentos relacionados"}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="Sin carpetas existentes" />
      )}
    </>
  );
};
