import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import useTable from "../hooks/useTable";
import { Alert } from "../../../utils/components/Alert";
import type { ColumnsType } from "antd/es/table";
import { padding8 } from "../styles/stylesUploadFile";
import Table2 from "../../../utils/components/Table";
import TableConsulta from "../components/TableConsulta";
import { getListEnfermedades } from "../../../utils/api/api";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import { getNews } from "../service/enfermedades.services";

export const ConsultCharge = () => {
  const typeDocument = [
    {
      value: "CC",
      label: "Cédula ciudadanía",
    },
    {
      value: "CE",
      label: "Cédula de extranjería",
    },
    {
      value: "CD",
      label: "Carné diplomático",
    },
    {
      value: "PA",
      label: "Pasaporte",
    },
    {
      value: "SC",
      label: "Salvoconducto de permanencia",
    },
    {
      value: "PT",
      label: "Permiso temporal de permanencia",
    },
    {
      value: "PE",
      label: "Permiso Especial de Permanencia",
    },
    {
      value: "RC",
      label: "Registro civil",
    },
    {
      value: "TI",
      label: "Tarjeta de identidad",
    },
    {
      value: "CN",
      label: "Certificado de nacido vivo",
    },
    {
      value: "AS",
      label: "Adulto sin identificar",
    },
    {
      value: "MS",
      label: "Menor sin identificar",
    },
    {
      value: "DE",
      label: "Documento extranjero",
    },
    {
      value: "SI",
      label: "Sin identificación",
    },
  ];
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const [validateTable, setValidateTable] = useState<any>(null);
  const [valuesInput, setValuesInput] = useState<any>([]);
  const [lstNumeroDocumentos, setLstNumeroDocumentos] = useState<any>([{ label: "", value: "" }]);
  const [valorNumeroDocumento, setvalorNumeroDocumento] = useState<any>({ label: "", value: "" });
  const [form] = Form.useForm();
  const { Option } = Select;
  const {
    filters,
    data,
    loading,
    total,
    getData,
    resetFilters,
    handleTableChange,
  } = useTable(
    {
      claveArchivo: "",
      novedades: [],
      idEnfermedad: "",
      idIps: "",
      tipoDocumento: "",
      documento: [],
      limit: 10,
      page: 1,
    },
    "/api/v1/consulta/paciente",
    "POST"
  );
  const [novedades, setNovedades] = useState<any>([]);

  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    hidden: boolean;
  }>({
    message: "",
    type: "error",
    hidden: true,
  });
  const [isUpdateChargeOpen, setIsUpdateChargeOpen] = useState(false);

  const showModal = () => {
    setIsUpdateChargeOpen(true);
  };

  const handleOk = () => {
    setIsUpdateChargeOpen(false);
  };

  const handleCancel = () => {
    setIsUpdateChargeOpen(false);
  };

  const onSubmit = async (values: any) => {
    const inputString = valuesInput.map((value: any) => value).join(",");
    const numberArray = inputString
      .split(",")
      .map((element: any) => Number(element));
    const newDataInit = {
      claveArchivo: "",
      novedades: values.novedades,
      idEnfermedad: validateTable,
      idIps: Number(values.idIps),
      tipoDocumento: values.tipoDocumento,
      documento:
        valuesInput.length === 0
          ? values.documento
          : numberArray.map((value: any) => value),
      limit: 10,
      page: 1,
    };
    const { data } = await getData({ ...filters, ...newDataInit });
  };
  const onSubmitInit = async () => {
    const newDataInit = {
      claveArchivo: "",
      novedades: [],
      idEnfermedad: validateTable,
      idIps: "",
      tipoDocumento: "",
      documento: [],
      limit: 10,
      page: 1,
    };
    const { data } = await getData({ ...filters, ...newDataInit });
  };
  const columnas: ColumnsType<any> = [
    {
      title: "Nombre de ubicación",
      align: "center",
      dataIndex: "nombre_ubicación",
    },
    {
      title: "Nombre",
      align: "center",
      dataIndex: "claveArchivo",
    },
  ];

  const change_page = async (page: number, pageSize?: number) => {
    await getData({
      ...filters,
      page,
      limit: pageSize,
    });
  };
  const getNovedades = async () => {
    let resp = await getNews(validateTable);
    const formattedNovedades = resp.map((novedad: any) => ({
      label: novedad.novCodigo,
      value: novedad.novCodigo,
    }));
    setNovedades(formattedNovedades);
  };
  const onKeyDown = (event: any, id: number) => {
    //id, nombre de la variable, valor de la variable, id enfermedad
    if (event.key === "Enter") {
      //alert(id);
    }
  };

  const setCellsEdit = (key: string, data: string, id: number) => {
    return (
      <div style={{ display: "flex", justifyContent: "left" }}>
        <input
          className="inputCells"
          id={`${key}_${id}`}
          defaultValue={data}
          type="text"
          onKeyDown={(event) => onKeyDown(event, id)}
        />
      </div>
    );
  };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     delete data[0]["campo_leido"];
  //     const nuevoJsonHeader = Object.assign({ FILA: 1 }, data[0]);
  //     const columnasLetrasExcel: any = ["X"].concat(generateExcelColumns(500));
  //     let contadorFila: number = 0;
  //     let contadorColumnas: number = 0;

  //     let contador: number = 0;
  //     const columsForJson: any = Object.keys(nuevoJsonHeader).map(
  //       (key, i: any) => {
  //         if (key != "id" && key != "campo_leido" && key != "clave_archivo") {
  //           return {
  //             title:
  //               key !== "error_validacion" &&
  //               key !== "clave_archivo" &&
  //               key !== "FILA"
  //                 ? `${columnasLetrasExcel[i]}`
  //                 : "",
  //             align: "center",
  //             width: "10%",
  //             rowScope: "row",
  //             dataIndex: `${key}`,
  //             key: `${key}`,
  //             fixed:
  //               key === "error_validacion"
  //                 ? "right"
  //                 : key === "FILA"
  //                 ? "left"
  //                 : null,
  //             children: [
  //               {
  //                 title:
  //                   key !== "error_validacion" &&
  //                   key !== "clave_archivo" &&
  //                   key !== "FILA"
  //                     ? dataColumnas.length > contadorColumnas
  //                       ? typeof dataColumnas[contador]["etiqueta"] != undefined
  //                         ? dataColumnas[contador++]["etiqueta"]
  //                         : "B"
  //                       : `V${(contadorColumnas += 1)}.${
  //                           key.toUpperCase().charAt(0).toUpperCase() +
  //                           key.slice(1)
  //                         }`.replace(/_/g, " ")
  //                     : "",
  //                 fixed:
  //                   key === "error_validacion"
  //                     ? "right"
  //                     : key === "FILA"
  //                     ? "left"
  //                     : null,

  //                 render: (data: any, index: any, i: number) => {
  //                   if (key === "FILA") {
  //                     contadorFila =
  //                       i - i + i + (filters.page - 1) * filters.limit;
  //                   }

  //                   if (key === "error_validacion") {
  //                     return (
  //                       <>
  //                         <Popover
  //                           overlayStyle={{ width: "20vw" }}
  //                           content={
  //                             <>
  //                               <p
  //                                 data-valor={data[key]}
  //                                 id={`${data["id"]}`}
  //                                 style={{
  //                                   borderRadius: 10,
  //                                   width: "100%",
  //                                   height: "25vh",
  //                                   color: "black",
  //                                   cursor: "pointer",
  //                                   overflowX: "scroll",
  //                                   fontFamily: "monospace",
  //                                 }}
  //                               >
  //                                 Espere miestras se consulta la informacion...
  //                               </p>
  //                             </>
  //                           }
  //                           trigger="click"
  //                         >
  //                           <Tag
  //                             key={i}
  //                             onClick={() => getDescriptionError(index)}
  //                             color="red"
  //                             style={{
  //                               width: "100%",
  //                               cursor: "pointer",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             Ver errores
  //                           </Tag>
  //                         </Popover>
  //                       </>
  //                     );
  //                   } else {
  //                     return key !== "FILA" ? (
  //                       <span style={stylesFormatoIncorrecto(data, key)}>
  //                         {data[key] == "" || data[key] == null ? (
  //                           <Tag
  //                             color="volcano"
  //                             style={{
  //                               width: "100%",
  //                               cursor: "pointer",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             FORMATO INCORRECTO
  //                           </Tag>
  //                         ) : (
  //                           setCellsEdit(key, data[key], index.id)
  //                         )}
  //                       </span>
  //                     ) : (
  //                       <div
  //                         style={{ backgroundColor: "#e4e4e4", border: "none" }}
  //                         className="w-100 p-0 m-0 text-center"
  //                       >
  //                         {(contadorFila += 1)}
  //                       </div>
  //                     );
  //                   }
  //                 },
  //               },
  //             ],
  //           };
  //         } else return {};
  //       }
  //     );
  //     if (columsForJson.length - 1) setColumns(columsForJson);
  //   } else {
  //     setColumns(undefined);
  //   }
  // }, [data]);
  const getListEnfermedadesConsulta = async () => {
    await getListEnfermedades().then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        const list: Ienfermedades[] = data.data;
        const { convert } = convertListToSelect(list);
        setListEnfermedades(convert);
      }
    });
  };

  const handlePressEnter = (event: any) => {
    if (event.key === 'Enter' && lstNumeroDocumentos.length < 4) {
      const targer = event.target as HTMLTextAreaElement;
      const inputValue = targer.getAttribute('value');
      const object = { label: inputValue, value: inputValue };
      setvalorNumeroDocumento(object)
      setLstNumeroDocumentos((prevValues: any) => [
        ...prevValues, object
      ]);
    }
  };

  const getLstNumeroDocumentosSelect = () => {
    if (lstNumeroDocumentos.length !== 0) {
      return lstNumeroDocumentos.map((item: any) => {
        return <Option value={item.value}>{item.label}</Option>;
      });
    }
  };

  useEffect(() => {
    getListEnfermedadesConsulta();
  }, []);

  useEffect(() => {
    onSubmitInit();
  }, [validateTable]);
  useEffect(() => {
    getNovedades();
  }, [validateTable]);
  return (
    <div className="container-fluid" style={{ marginTop: "20px" }}>
      <Card>
        <Form
          name="wrap"
          layout="vertical"
          colon={false}
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            label="Seleccionar una enfermedad"
            name="idEnfermedad"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Select
              className="w-25"
              showSearch
              placeholder="Selecciona la enfermedad"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listEnfermedades}
              onChange={(e) => {
                setValidateTable(e);
              }}
            />
          </Form.Item>
          {validateTable !== null && (
            <Row>
              <Col className="gutter-row" span={6}>
                <div style={{ ...padding8 }}>
                  <Form.Item label="Tipo de documento" name="tipoDocumento">
                    <Select
                      className="w-90"
                      showSearch
                      placeholder="Selecciona un tipo de documento"
                      optionFilterProp="children"
                      options={typeDocument}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={{ ...padding8 }}>
                  <Form.Item label="Numero documento" name="documento">
                    <Select
                      mode="multiple"
                      className="w-90"
                      showSearch
                      placeholder="Digite su numero de documento"
                      optionFilterProp="children"
                      onKeyDown={(e) => handlePressEnter(e)}
                      filterOption={(input:any, option:any) => option?.children?.toLowerCase().includes(input.toLowerCase())}
                      value={valorNumeroDocumento}>
                      {getLstNumeroDocumentosSelect()}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={{ ...padding8 }}>
                  <Form.Item label="Novedad" name="novedades">
                    <Select
                      mode="multiple"
                      className="w-90"
                      showSearch
                      placeholder="Selecciona una novedad"
                      optionFilterProp="children"
                      options={novedades}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={{ ...padding8 }}>
                  <Form.Item
                    label="Código prestador o eps que reporta"
                    name="idIps"
                  >
                    <Input
                      className="w-90"
                      placeholder="Selecciona código prestador o eps que reporta"
                  
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          )}
          <Alert {...alert} />

          <hr />

          <button
            type="button"
            onClick={() => {
              form.resetFields();
              resetFilters();
              setValidateTable(null);
            }}
            className="btn btn-outline-primary me-3"
          >
            Limpiar
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            Consultar
          </button>
        </Form>
      </Card>
      {validateTable !== null && (
        <Card className="mt-3">
          <button
            onClick={showModal}
            style={{ float: "right" }}
            className="btn btn-primary"
          >
            Editar
          </button>
          <Modal
            title="Editar cargue"
            open={isUpdateChargeOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <>
                <Tooltip
                  trigger="hover"
                  placement="top"
                  color="#ffff"
                  title={
                    <>
                      <Tooltip title={"Documento (txt)"}>
                        <Button
                          onClick={() => {
                            handleOk();
                          }}
                        >
                          txt
                        </Button>
                      </Tooltip>
                      <Tooltip title={"Documento (csv)"}>
                        <Button
                          onClick={() => {
                            handleOk();
                          }}
                        >
                          csv
                        </Button>
                      </Tooltip>
                    </>
                  }
                >
                  <Button>Exportar</Button>
                </Tooltip>
              </>,
            ]}
            width={"80%"}
          >
            <Form form={form} component={false}></Form>
            <Table2
              items={data}
              columns={columnas}
              with_pagination
              paginationTop
              count={total ? total : 0}
              loading={loading}
              change_page={change_page}
            />
          </Modal>

          <TableConsulta
            total={total}
            loading={loading}
            data={data}
            filters={filters}
            novedades={[]}
            handleTableChange={handleTableChange}
          />
        </Card>
      )}
    </div>
  );
};
