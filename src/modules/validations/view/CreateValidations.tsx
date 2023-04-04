import { Form, Card, Select } from "antd";
import { useEffect, useState } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Ienfermedades } from "../../upload/interfaces/enfermedades.interfaces";
import { FormValidations } from "../components/FormValidations";
import useFormValidations from "../hooks/useFormValidations";

export const CreateValidations = () => {
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const { getListValidacionesConsulta } = useFormValidations(); 
  const TipoDependencia = [
    {
      value: 1,
      label: "Integración",
    },
    {
      value: 2,
      label: "Dependencia",
    },
  ];

  useEffect(() => {
    //onClickEnfermedades(4);
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

  const onClickEnfermedades =(value:number)=>{
    getListValidacionesConsulta(value);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className="bg-white d-flex flex-row pt-3 ps-4">
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          Administrar validaciones
        </span>
      </div>
      <div className="container-fluid" style={{ marginTop: "2%" }}>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Card>
            <div className="row">
              <div className="col">
                <Form.Item
                  label="Enfermedad"
                  name="enfermedad"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Select
                    placeholder="Selecciona la enfermedad"
                    onChange={((value)=>{getListValidacionesConsulta(value);})}
                    options={listEnfermedades}
                    
                  />
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item
                  label="Tipo dependencia"
                  name="tipoDependencia"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Select options={TipoDependencia} />
                </Form.Item>
              </div>
            </div>
          </Card>

          <FormValidations />

          <FormValidations />

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        </Form>
      </div>
    </>
  );
};
