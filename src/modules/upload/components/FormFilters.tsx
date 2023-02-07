import { Card, DatePicker, Form, Input, Select } from "antd";
import { Alert } from "../../../utils/components/Alert";
import { LabelOptional } from "../../../utils/components/Labeloptional";
import { Font_Montserrat } from "../../../utils/css/containerBackground";
import { FC, useState, useEffect } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import locale from 'antd/es/date-picker/locale/es_ES';

interface IFormFilters {
  activeKey: string;
  onSubmit: (values: any) => any;
  onClear: () => any;
  jsonAlert: any;
  loading: boolean;
}

const FormFilters: FC<IFormFilters> = ({
  activeKey,
  onSubmit,
  onClear,
  jsonAlert,
  loading,
}) => {
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    getListEnfermedadesConsulta();
  }, []);


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

  return (
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
        onFinish={onSubmit}
        form={form}
      >
        <div className="row">
          <div className="col-3">
            <Form.Item
              label="Seleccionar un enfermedad"
              name="idEnfermedad"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                disabled={activeKey === "2"}
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
                disabled={activeKey === "2"}
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
                  <Select
                    disabled={activeKey === "2"}
                    style={{ width: "30%" }}
                    placeholder="C.C"
                  >
                    <Option value="CC">CC</Option>
                    <Option value="TI">TI</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={["document", "number"]} noStyle>
                  <Input
                    disabled={activeKey === "2"}
                    style={{ width: "70%" }}
                    placeholder="Número de documento"
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
                disabled={activeKey === "2"}
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
          onClick={() => {
            form.resetFields();
            onClear();
          }}
          className="btn btn-outline-primary me-3"
        >
          Limpiar
        </button>
        <button
          type="submit"
          style={{
            ...Font_Montserrat(true, 13, 18),
          }}
          disabled={loading || activeKey === "2"}
          className="btn btn-primary"
        >
          Consultar
        </button>
      </Form>
    </Card>
  );
};

export default FormFilters;
