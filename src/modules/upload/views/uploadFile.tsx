import React, { useEffect } from "react";
import { Font_Montserrat } from "../../../utils/css/containerBackground";
import { Card, Form, Input, Select, Tabs, DatePicker, TabsProps } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import { ColumnsType } from "antd/es/table";
import { MyState } from "../types/Consulta.type";
import TableConsulta from "../components/TableConsulta";
import { LabelOptional } from "../../../utils/components/Labeloptional";
import { getListEnfermedades } from "../../../utils/api/api";
import {
  IConsulta,
  Ienfermedades,
} from "../interfaces/enfermedades.interfaces";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Alert } from "../../../utils/components/Alert";
import { onClickConsultar } from "../service/enfermedades.services";
import TablePatientDetail from "../components/TablePatientDetail";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const constantAlertJson = {
  message: "",
  type: "error",
  hidden: true,
};
export default class QueryRegister extends React.Component<{}, MyState> {
  // setTabInformacionDetalle = async () => {
  //   this.setState({
  //     items: this.state.items?.map((item, index) => {
  //       if (index === 1) {
  //         return {
  //           ...item,
  //           disabled: item.disabled === true,
  //         };
  //       }
  //       return item;
  //     }),
  //     activeKey: "2",
  //   });
  // };

  

  // returnToConsultation = async () => {
  //   this.setState({
  //     items: this.state.items?.map((item, index) => {
  //       if (index === 1) {
  //         return {
  //           ...item,
  //           disabled: item.disabled === true,
  //         };
  //       }
  //       return item;
  //     }),
  //     activeKey: "1",
  //   });
  // };

  state: MyState = {
    jsonAlert: constantAlertJson,
    listEnfermedades: [],
    listIps: [],
    columnas: [],
    /* variable de los tab */
    dataTableConsulta: [],
    /* variable de los campos del formulario */
    activeKey: "1",
  };

  items: TabsProps["items"] = [
    {
      key: "1",
      label: `Consulta de datos cargados`,
      children: (
        <TableConsulta
          setTabInformacionDetalle={false}
          data={this.state.dataTableConsulta}
        />
      ),
      disabled: false,
    },
    {
      key: "2",
      label: `Detalle de una paciente`,
      children: <TablePatientDetail returnToConsultation={false} />,
      disabled: true,
    },
    {
      key: "3",
      label: `Log de errores`,
      children: `tab 3`,
      disabled: true,
    },
  ];

  /* Columnas para la tabla de detalle persona */
  columnasDetalle: ColumnsType<any> = [
    { title: "Id", dataIndex: "id", width: "5%" },
    { title: "Telefono", dataIndex: "telefono" },
    { title: "Regimen de afilición", dataIndex: "regimenAfiliacion" },
    { title: "Municipio de residencia", dataIndex: "municipioResidencia" },
    { title: "Fecha de afilicion Eapb", dataIndex: "fechaAfilicionEapb" },
    { title: "Código Eapb", dataIndex: "codigoEapb" },
    { title: "Causa de muerte", dataIndex: "causaMuerte" },
    { title: "Fecha muerte", dataIndex: "fechaMuerte" },
    { title: "Fecha de corte", dataIndex: "fechaCorte" },
    { title: "Código serial", dataIndex: "codigoSerial" },
  ];

  componentDidMount = async () => {
    await this.getListEnfermedadesConsulta();
    console.log('aquiiiiiiiiii');
  
  };

  getListEnfermedadesConsulta = async () => {
    await getListEnfermedades().then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        const list: Ienfermedades[] = data.data;
        const { convert } = convertListToSelect(list);
        this.setState({ listEnfermedades: convert });
      }
    });
  };

  handleChangeConsulta = async (values: any) => {
    this.setState({ jsonAlert: constantAlertJson });
    const dataFinal: IConsulta = {
      idEnfermedad: values.idEnfermedad,
      idIps: values?.idIps || null,
      tipoDocumento: values?.document?.type || "",
      documento: values?.document?.number || "",
      desde: moment(new Date(values.rangePicker[0])).format("YYYY-MM-DD"),
      hasta: moment(new Date(values.rangePicker[1])).format("YYYY-MM-DD"),
      page: 1,
      limit: 10,
    };
    const { data } = await onClickConsultar(dataFinal);
    console.log("respuesta servicio", data?.message);

    this.setState({
      jsonAlert: { ...this.state.jsonAlert, message: data?.message || "" },
      dataTableConsulta: data?.data,
    });
  };

  render(): React.ReactNode {
    const { listEnfermedades, jsonAlert, activeKey } = this.state;

    return (
      <>
        <div className="container-fluid">
          <Card
            className="mt-4"
            title={
              <span style={Font_Montserrat(true, 13, 12)}>
                Realizar consulta de registros cargados &#160;
                <span
                  style={{
                    color: "#AD0808",
                    ...Font_Montserrat(false, 10, 12),
                  }}
                >
                  - &#160; Llenar todos los campos que sean obligatorios{" "}
                </span>
              </span>
            }
          >
            <Form
              name="wrap"
              layout="vertical"
              colon={false}
              onFinish={this.handleChangeConsulta}
            >
              <div className="row">
                <div className="col-3">
                  <Form.Item
                    label="Seleccionar un enfermedad"
                    name="idEnfermedad"
                    rules={[{ required: true, message: "Campo obligatorio" }]}
                  >
                    <Select
                      className="w-100"
                      showSearch
                      placeholder="Selecciona la enfermedad"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={listEnfermedades}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item
                    label={
                      <>
                        Seleccionar la IPS <LabelOptional />
                      </>
                    }
                    name="idIps"
                    // rules={[{ required: true, message: 'Campo obligatorio' }]}
                  >
                    <Select
                      className="w-100"
                      showSearch
                      placeholder="Selecciona la IPS"
                      optionFilterProp="children"
                      // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                      options={[]}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item
                    label={
                      <>
                        Número de documento <LabelOptional />
                      </>
                    }
                    name="document"
                  >
                    <Input.Group compact>
                      <Form.Item name={["document", "type"]} noStyle>
                        <Select style={{ width: "30%" }} placeholder="C.C">
                          <Option value="CC">CC</Option>
                          <Option value="TI">TI</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={["document", "number"]} noStyle>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Numero de documento"
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item
                    label="Desde - Hasta"
                    name="rangePicker"
                    rules={[{ required: true, message: "Campo obligatorio" }]}
                  >
                    <RangePicker
                      locale={locale}
                      placeholder={["Fecha inicial", "Fecha final"]}
                    />
                  </Form.Item>
                </div>
              </div>

              <Alert {...jsonAlert} />
              <hr />

              <button
                type="button"
                style={{
                  ...Font_Montserrat(true, 13, 18),
                }}
                // onClick={() => form.resetFields()}
                className="btn btn-outline-primary me-3"
              >
                Limpiar
              </button>
              <button
                type="submit"
                style={{
                  ...Font_Montserrat(true, 13, 18),
                }}
                className="btn btn-primary"
              >
                Consultar
              </button>
            </Form>
          </Card>
          <Card className="mt-4">
            <Tabs
              onChange={(key: string) => {
                this.setState({ activeKey: key });
              }}
              activeKey={activeKey}
              items={this.items}
            />
          </Card>
        </div>
      </>
    );
  }
}
