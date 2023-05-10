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

interface ICollapse {
  clave: string;
  listFolders: (values: any) => Promise<any>;
  folders: any[];
  newValue: {}
}

export const CollapseFolders: FC<ICollapse> = ({
  clave,
  listFolders,
  folders,
  newValue
}) => {
  const { Panel } = Collapse;
  const [listFiles, setListFiles] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [visiblePopover, setVisiblePopover] = useState(false);

  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    beforeUpload: async (values) => {
      return false;
    },
    multiple: true,
    showUploadList: false
  };

  const editFolder = async (folder: any) => {
    await updateNameFolder(
      clave.concat(`;${folder}`),
      valueInput.trim() || folder.trim()
    );    
    await listFolders({ stringListDirectorios: clave });
  };

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
    const resp = await saveFilesInFolder(info.file, clave.concat(`;${folder}`));
    if (info.file.status !== "uploading") {
    }
    if (resp.status === 200) {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };


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
                }}>
                <Button icon={<UploadOutlined />}>Subir archivo</Button>
              </Upload>
            </>
          }
          title="Subir reportes"
        >
          <UploadOutlined className="me-2" style={{cursor: "pointer"}} />
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
                    await listFolders(newValue)
                  }}>
                  Actualizar
                </button>
              </div>
            </>
          }
          title="Cambiar nombre carpeta"
        >
          <EditOutlined className="me-2 text-info" style={{cursor: "pointer"}}/>
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
                              clave.concat(`;${folder}`),                              
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
