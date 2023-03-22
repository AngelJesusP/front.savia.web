import { Card, Popover, Tag, Input } from "antd";
import axios from "axios";
import { useEffect, FC, useState } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getLogErrors } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import ProgressFile from "./ProgressFile";
const originUrl = import.meta.env.VITE_URL;

const { TextArea } = Input;
const path = "/api/v1/consulta/errores/detallado";

// interface ITableGeneric {
//   activeKey: string;
// }

const TableGeneric: FC<any> = ({ idEnfermedad }) => {
  const [texto, setText] = useState("");

  const constantAlertJson = {
    message: "",
    type: "error",
    hidden: true,
  };

  const [colums, setColumns] = useState();
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
  const [getskeleton, setSkeleton] = useState<boolean>(false);
  const [filters, setFilters] = useState<IConsulta>({
    idEnfermedad: -1,
    idIps: null,
    tipoDocumento: "",
    documento: "",
    desde: "",
    hasta: "",
    page: 1,
    limit: 10,
  });

  const getDescriptionError = async (key: any) => {
    setSkeleton(true);
    let response: any;
    console.log("exito: ", key);
    console.log(originUrl, path);

    const json = {
      idEnfermedad: 1,
      claveArchivo: key.clave_archivo,
      idPaciente: key.id,
    };
    response = await axios.get(`${originUrl}${path}`, {
      params: {
        ...json,
      },
    });
    console.log(response);
    let data = response.data.data[0];
    let texto: string = "";
    data.forEach((dta: any) => {
      console.log(dta.descripcion);
      texto += `Fila: ${dta.posicionFila}\nColumna: ${dta.posicionColumna}\nVariable: ${dta.variable}\nDescripción: ${dta.descripcion}\n------------------------------\n\n`;
    });
    setSkeleton(false);
    setText(texto);
  };

  useEffect(() => {
    getData({
      ...filters,
    });
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.length > 0) {
      const columsForJson: any = Object.keys(data[0]).map((key) => {
        //console.log('columns: ',columsForJson);
        if (key != "id") {
          return {
            title: `${key.split("_").join(" ")}`,
            dataIndex: `${key}`,
            key: `${key}`,
            fixed: key === "error_validacion" ? "right" : null,
            render: (value: any, index: any) => {
              if (key === "error_validacion") {
                return (
                  <>
                    <Popover
                      overlayStyle={{ width: "20vw" }}
                      content={
                        <TextArea
                          className="w-100"
                          value={texto}
                          disabled={true}
                          autoCorrect="false"
                          style={{ height: "10vh", color: "black" }}
                        />
                      }
                      title={"Lista de errores"}
                      trigger="click"
                    >
                      <Tag
                        key={key}
                        onClick={() => getDescriptionError(index)}
                        color="red"
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      >
                        Ver errores
                      </Tag>
                    </Popover>
                  </>
                );
              } else return <span>{value}</span>;
            },
          };
        } else return {};
      });
      if (columsForJson.length - 1) setColumns(columsForJson);
    } else {
      setColumns(undefined);
    }
  }, [data]);

  const change_page = async (page: number, pageSize?: number) => {
    await getData({
      ...filters,
      page,
      limit: pageSize,
    });
  };

  const getData = async (values: any) => {
    console.log(values);

    setJsonAlert(constantAlertJson);
    setLoading(true);
    const dataFinal: IConsulta = {
      claveArchivo: "11-2023-03-22-10-51-19",
      idEnfermedad: idEnfermedad || -1,
      idIps: values?.idIps || null,
      tipoDocumento: values?.document?.type || "",
      documento: values?.document?.number || "",
      desde: values?.desde || "",
      hasta: values?.hasta || "",
      page: values.page || 1,
      limit: values.limit || 10,
    };
    let valuesResponse;

    const { data } = await getLogErrors(dataFinal);
    valuesResponse = data;
    setData(valuesResponse?.data || []);
    setFilters(dataFinal);
    setJsonAlert({ ...jsonAlert, message: valuesResponse?.message || "" });
    setTotal(Number(valuesResponse?.items?.replace(/[\[\]]/g, "")) || null);
    setLoading(false);
  };

  const onClear = () => {
    setLoading(true);
    setFilters({
      idEnfermedad: -1,
      idIps: null,
      tipoDocumento: "",
      documento: "",
      desde: "",
      hasta: "",
      page: 1,
      limit: 10,
    });
    setTotal(null);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setData([]);
  };

  return (
    <div className="container-fluid">
      <FormFilters
        onClear={onClear}
        jsonAlert={jsonAlert}
        loading={loading}
        onSubmit={getData}
        type="error"
      />
      <Card className="mt-3">
        <Table
          items={data}
          columns={colums}
          with_pagination
          paginationTop
          count={total ? total : 0}
          loading={loading}
          change_page={change_page}
        />
        <div className="d-flex justify-content-end ">
          <ProgressFile filters={{ ...filters, bandera: false }} />
        </div>
      </Card>
    </div>
  );
};

export default TableGeneric;
