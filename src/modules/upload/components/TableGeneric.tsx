import { Card, Popover, Tag, Skeleton } from "antd";
import axios from "axios";
import { useEffect, FC, useState } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getLogErrors } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import ProgressFile from "./ProgressFile";

const originUrl = import.meta.env.VITE_URL;
const path = "/api/v1/consulta/errores/detallado";

const TableGeneric: FC<any> = ({ idEnfermedad, claveArchivo }) => {
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
    idIps: 0,
    tipoDocumento: "",
    documento: "",
    desde: "",
    hasta: "",
    page: 1,
    limit: 10,
  });


  /* Un gancho que se ejecuta cuando se monta el componente y cuando cambian los datos. */
  const getDescriptionError = async (key: any, nameKey: string) => {
    setSkeleton(true);
    let response: any;

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
    let elemento: any = document.getElementById(`${nameKey}_${key.id}`);
    const valor :string = elemento.getAttribute('data-valor');
    const lista = valor.split(';');
    
    
    let data = response.data.data[0];
    let texto: string = "<b>DETALLE DE LOS ERRORES</b><br/>";
    texto += `======================</br>`;
    data.forEach((dta: any, index: number) => {
      texto += `<b>ITERADOR :</b> <i>${index+1}<i> <br/>`;
      texto += `<b>CODIGO ERROR: </b> <i>${lista[index]}<i><br/>`;
      texto += `<b>FILA ➡: </b> <i>${dta.posicionFila}<i> <br/>`;
      texto += `<b>COLUMNA ⬇:</b> <i>${dta.posicionColumna}</i> <br/>`;
      texto += `<b>VARIABLE</b>: ${dta.variable}<br/>`;
      texto += `<b>======================</b> <br/><br/>`;
    });

    
    
    if (elemento != null) {
      elemento.innerHTML = texto;
    }
    setSkeleton(false);
  };

  useEffect(() => {
    getData({
      ...filters,
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const columsForJson: any = Object.keys(data[0]).map((key) => {
        if (key != "id" && key != "campo_leido") {
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
                        <>
                          {getskeleton ? (
                            <Skeleton />
                          ) : (<p
                            data-valor={value}
                            id={`${key}_${index.id}`}
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              height: "25vh",
                              color: "black",
                              cursor: "pointer",
                              overflowX: 'scroll',
                              fontFamily: 'monospace'
                            }}> </p>)}
                        </>
                      }
                      // title={"Lista de errores"}
                      trigger="click"
                    >
                      <Tag
                        key={key}
                        onClick={() => getDescriptionError(index, key)}
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

  /**
   * Se usa un formulario para obtener los valores y luego se usan esos valores para hacer
   * una solicitud al backend.
   * </código>
   * @param {any} values - cualquiera = {
   */
  const getData = async (values: any) => {
    setJsonAlert(constantAlertJson);
    setLoading(true);
    const dataFinal: IConsulta = {
      claveArchivo: claveArchivo,
      idEnfermedad: idEnfermedad || -1,
      idIps: values?.idIps || 0,
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
  /**
   * OnClear() es una función que establece el estado de carga en verdadero, establece el estado de los
   * filtros en un nuevo objeto, establece el estado de total en nulo, establece el estado de carga en
   * falso después de 1000 ms y establece el estado de los datos en una matriz vacía.
   */
  const onClear = () => {
    setLoading(true);
    setFilters({
      idEnfermedad: -1,
      idIps: 0,
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
