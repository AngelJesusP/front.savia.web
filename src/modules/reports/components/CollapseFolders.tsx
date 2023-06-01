import React, { FC, useEffect, useState } from "react";
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
  getFilesToViewForFolder,
  saveFilesInFolder,
  updateNameFolder,
} from "../service/reports.service";
import { swal } from "../../../utils/components/SwalAlert";

interface ICollapse {
  clave: string;
  listFolders: (values: any) => Promise<any>;
  folders: any[];
  newValue: {};
  refresh: boolean;
  setRefresh: any;
}

export const CollapseFolders: FC<ICollapse> = ({
  clave,
  listFolders,
  folders,
  newValue,
  refresh,
  setRefresh,
}) => {
  const { Panel } = Collapse;
  const [listFiles, setListFiles] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [urlviewFile, setUrlviewFile] = useState("");

  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    beforeUpload: async (values) => {
      return false;
    },
    multiple: true,
    showUploadList: false,
  };

  const getStringTrim = (str: string) => {
    return str
      .toLowerCase() // make sure string is lowercase
      .replace(/\b[aeiuo]\w+\b/g, "$&way") // starts with vowel
      .replace(/\b([^aeiou\s])(\w+)\b/g, "$2$1ay"); // starts with consonant
  };

  const editFolder = async (folder: any) => {
    const resp = await updateNameFolder(
      clave.concat(`;${folder}`),
      valueInput.trim() || folder.trim()
    );
    console.log(resp);

    switch (resp.status) {
      case 200:
        await swal.fire(
          "¡Renombrada exitosamente!",
          "Esta carpeta ha sido renombrada exitosamente",
          "success"
        );
        break;
      case 400:
        await swal.fire("¡Error!", resp.message, "info");
        break;
      default:
        break;
    }
    await listFolders({ stringListDirectorios: clave });
  };

  const deleteFolder = async (folder: string) => {
    await swal
      .fire({
        title: "¿Estás seguro de eliminar esta carpeta?",
        text: "¡No podrás devolver los cambios realizados!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const deleted = await deleteFolders(clave, folder.trim());
          if (deleted.status === 200) {
            console.log("elimino");
            await swal.fire(
              "¡Eliminado exitosamente!",
              "Esta carpeta ha sido eliminada",
              "success"
            );
            setRefresh(!refresh);
          }
        }
      });
  };

  const getFiles = async (key: string | string[]) => {
    if (typeof key === "string") {
      const resp = await getFilesForFolder(clave, key.trim());
      setUrlviewFile(`${clave};${key.trim()}`);
      if (resp.data[0]?.replace(/[\[\]]/g, "")) {
        setListFiles(resp.data[0]?.replace(/[\[\]]/g, "").split(","));
      } else {
        setListFiles([]);
      }
    }
  };

  const viewFile = async (name: string) => {
    if (name) {
      const resp = await getFilesToViewForFolder(urlviewFile, name.trim());
      window.open(resp.request.responseURL, "_blank");
    }
  };

  const createFiles = async (
    info: UploadChangeParam<UploadFile<any>>,
    folder: string
  ) => {
    const resp = await saveFilesInFolder(info.file, clave.concat(`;${folder}`));
    const { data } = resp;
    if (data.status === 200) {
      await message.success(
        `${info.file.name} El archivo se ha subido exitosamente`
      );
    } else {
      await message.error(`Error al subir ${info.file.name}: ${data.message}`);
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
                }}
              >
                <Button icon={<UploadOutlined />}>Subir archivo</Button>
              </Upload>
            </>
          }
          title="Subir reportes"
        >
          <UploadOutlined className="me-2" style={{ cursor: "pointer" }} />
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
                    await listFolders(newValue);
                  }}
                >
                  Actualizar
                </button>
              </div>
            </>
          }
          title="Cambiar nombre carpeta"
        >
          <EditOutlined
            className="me-2 text-info"
            style={{ cursor: "pointer" }}
          />
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
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          viewFile(fileName);
                        }}
                      >
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
