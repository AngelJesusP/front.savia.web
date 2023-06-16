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

export const ConsultCharge = () => {
  const [form] = Form.useForm();
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
      limit: 10,
      page: 1,
      idEnfermedad: null,
    },
    "/api/v1/historico/archivo"
  );
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

  const onSubmit = async (values: any) => {};

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
              // disabled={activeKey === "2"}
              className="w-25"
              showSearch
              placeholder="Selecciona la enfermedad"
              optionFilterProp="children"
              // filterOption={(input, option) =>
              //   (option?.label ?? "")
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
              // options={listEnfermedades}
            />
          </Form.Item>
          <Row>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Tipo de documento"
                  name="tipo_documento"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    className="w-90"
                    showSearch
                    placeholder="Selecciona un tipo de documento"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Numero documento"
                  name="numero_documento"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Novedad"
                  name="novedad"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    // disabled={activeKey === "2"}
                    className="w-90"
                    showSearch
                    placeholder="Selecciona una novedad"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Código prestador o eps que reporta"
                  name="cod_eps_reporta"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    // disabled={activeKey === "2"}
                    className="w-90"
                    showSearch
                    placeholder="Selecciona código prestador o eps que reporta"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Alert {...alert} />

          <hr />

          <button
            type="button"
            onClick={() => {
              form.resetFields();
              resetFilters();
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
    </div>
  );
};
