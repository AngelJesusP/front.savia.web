import { Card, Form, Radio, Select } from "antd";
import { useState } from "react";
import FormRegisterUser from "./FormRegisterUser";
import CreatePrestador from "./CreatePrestador";

const ValidationCreate = () => {
  const [valueSelect, setValueSelect] = useState<string | null>(null);
  const [value, setValue] = useState<any>(0);
  const options = [
    {
      value: "1",
      label: "Usuario",
    },
    {
      value: "2",
      label: "Prestador",
    },
  ];
  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Card>
        <Form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Seleccione el tipo de perfil a crear</label>
            <Select
              options={options}
              onChange={(e) => setValueSelect(e)}
            ></Select>
          </div>
         {
          valueSelect === "2"  &&  <div style={{ display: "flex", flexDirection: "column",marginTop:"10px" }}>
          <label>
           ¿Es prestador de sede principal?
          </label>
          <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Si</Radio>
          <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
         }
        </Form>
      </Card>
      {valueSelect === "1" ? (
        <FormRegisterUser />
      ) : valueSelect === "2" && value !== 0 ? (
        <CreatePrestador value={value}/>
      ) : (
        ""
      )}
    </div>
  );
};

export default ValidationCreate;
