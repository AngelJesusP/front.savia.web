import { Form, Input, Card } from "antd";
import { useState } from "react";
import { fontLabelComponent } from "../styles/stylesAuth";
import "../../../utils/Css/FormRegister.css";
import { CreateUser } from "../function/index.auth";

const CreatePrestador = () => {
  const [values, setValues] = useState<object>({
    firstName: "",
    email: "",
    password: "",
    role: "ROLE_ADMIN",
    prestador: true,
    sede: true,
    codigo : "",
    consecutivo : "01"
  });
  
  const [viewPass, setViewPass] = useState<boolean>(false);
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const create_user = async () => {
    const resp = await CreateUser(values);
  };
  return (
    <div>
      <div className="bg-white d-flex flex-row pt-3 ps-4">
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          Crear Prestador
        </span>
      </div>
      <Card bodyStyle={{ padding: "20px" }}>
        <div>
          <Form onFinish={create_user} initialValues={{ remember: true }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
              }}
            >
              <div>
                <label
                  htmlFor="user_id"
                  className="form-label "
                  style={fontLabelComponent(false)}
                >
                  Nombre del prestador
                </label>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca el nombre del prestador",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form-control"
                    id="user_id"
                    name="firstName"
                    autoComplete="off"
                    style={fontLabelComponent(true)}
                    onChange={onChange}
                    maxLength={20}
                  />
                </Form.Item>
              </div>
              <div>
                <label
                  htmlFor="user_id"
                  className="form-label "
                  style={fontLabelComponent(false)}
                >
                  Correo Electrónico
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca un email valido",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    className="form-control"
                    id="user_id"
                    name="email"
                    autoComplete="off"
                    style={fontLabelComponent(true)}
                    onChange={onChange}
                  />
                </Form.Item>
              </div>
            </div>
       
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
              }}
            >
              <div>
                <label
                  htmlFor="user_id"
                  className="form-label "
                  style={fontLabelComponent(false)}
                >
                  Código del prestador
                </label>
                <Form.Item
                  name="codigo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca un código valido",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form-control"
                    id="user_id"
                    name="codigo"
                    autoComplete="off"
                    style={fontLabelComponent(true)}
                    onChange={onChange}
                  />
                </Form.Item>
              </div>
              <div>
                <label
                  htmlFor="user_id"
                  className="form-label "
                  style={fontLabelComponent(false)}
                >
                  Contraseña
                </label>
                <div onClick={() => setViewPass(!viewPass)}>
                  <span className="viewPassword_register_user">Ver</span>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message:
                        "La contraseña debe contener mínimo 8 caracteres",
                      min: 8,
                    },
                  ]}
                >
                  <Input
                    type={!viewPass ? "password" : "text"}
                    className="form-control"
                    id="user_id"
                    name="password"
                    autoComplete="off"
                    style={fontLabelComponent(true)}
                    onChange={onChange}
                    maxLength={20}
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <hr />
              <div className="buttonRegisterUser">
                <button
                  style={{
                    width: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className="btn btn-primary"
                  
                >
                  Registrarse
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default CreatePrestador;
