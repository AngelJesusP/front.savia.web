import { Card, Form, Select } from "antd";
import { useState } from "react";
import FormRegisterUser from "./FormRegisterUser";
import CreatePrestador from "./CreatePrestador";

const ValidationCreate = () => {
  const [valueSelect, setValueSelect] = useState<string | null>(null);
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
        </Form>
      </Card>
      {valueSelect === "1" ? (
        <FormRegisterUser />
      ) : valueSelect === "2" ? (
        <CreatePrestador />
      ) : (
        ""
      )}
    </div>
  );
};

export default ValidationCreate;
