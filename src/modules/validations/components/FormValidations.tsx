import { Card, Form, Input, Select } from "antd";
import { useEffect } from "react";
import useFormValidations from "../hooks/useFormValidations";

export const FormValidations = () => {
  const { listVariables } = useFormValidations();
 
//   useEffect(() => {
//   }, [listVariables]);

  const TipoDato = [
    {
      value: "String",
      label: "Texto",
    },
    {
      value: "Number",
      label: "Numérico",
    },
    {
      value: "Date",
      label: "Fecha",
    },
  ];
  const Operador = [
    {
      value: "==",
      label: "Igualdad",
    },
    {
      value: "!=",
      label: "Diferencia",
    },
    {
      value: ">",
      label: "Mayor",
    },
    {
      value: ">=",
      label: "Mayor o igual",
    },
    {
      value: "<",
      label: "Menor",
    },
    {
      value: "<=",
      label: "Menor o igual",
    },
  ];
  return (
    <>
      <Card className="mt-3">
        <div className="row">
          <div className="col">
            <Form.Item
              label="Seleccionar Variable"
              name="seleccionarVariable"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Select options={listVariables} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item
              label="Tipo de dato"
              name="tipoDato"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Select options={TipoDato} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item
              label="Operador lógico"
              name="operadorLogico"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Select options={Operador} />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item
              label="Valor del campo"
              name="campoValor"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Valor" />
            </Form.Item>
          </div>
        </div>
      </Card>
    </>
  );
};
