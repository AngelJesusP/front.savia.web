import { Card, Form, Input, Select } from "antd";
import { Alert } from "../../../utils/components/Alert";
import { LabelOptional } from "../../../utils/components/Labeloptional";
import { FC, useState, useEffect } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import { DocTypes } from "../constants/Doctypes";


interface IFormFilters {
  onSubmit: (values: any) => any;
  onClear: () => any;
  jsonAlert: any;
  loading: boolean;
  values?: {
    idEnfermedad: number;
    idIps?: number;
    document?: any;
    rangePicker?: any;
  };
  type?: "patient" | "error";
}

const FormFilters: FC<IFormFilters> = ({
  onSubmit,
  onClear,
  jsonAlert,
  values,
  type,
}) => {
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const [validateField, setValidateField] = useState("");

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
    <Card>
      <Form
        name="wrap"
        layout="vertical"
        colon={false}
        onFinish={onSubmit}
        form={form}
        fields={[
          { name: ["idEnfermedad"], value: values?.idEnfermedad || null },
        ]}
      >
        <div className="row align-items-center">
          <div className={`col-12 col-md-6 col-lg-${type === "error" ? 3 : 6}`}>
            <Form.Item
              label={
                <>
                  Número de documento
                  <LabelOptional />
                </>
              }
              name="document"
            >
              <Input.Group compact>
                <Form.Item
                  name={["document", "type"]}
                  noStyle
                  rules={[
                    {
                      required: validateField ? true : false,
                      message: "Campo obligatorio",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "30%" }}
                    placeholder="C.C"
                    options={DocTypes}
                  ></Select>
                </Form.Item>
                <Form.Item name={["document", "number"]} noStyle>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Número de documento"
                    onChange={({ target }) => {
                      setValidateField(target.value);
                    }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </div>
        </div>

        <Alert {...jsonAlert} showIcon closable />
        <hr />

        <button
          type="button"
          onClick={() => {
            form.resetFields();
            onClear();
          }}
          className="btn btn-outline-primary me-3"
        >
          Limpiar
        </button>
        <button type="submit" className="btn btn-primary">
          Consultar
        </button>
      </Form>
    </Card>
  );
};

export default FormFilters;
