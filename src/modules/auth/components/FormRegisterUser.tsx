import { Modal, Form, Input } from "antd";
import { FC, useState } from "react";
import { fontLabelComponent } from "../styles/stylesAuth";
import "../../../utils/Css/FormRegister.css";
import logoHeaderLogin from "../../../utils/assets/img/logoHomeSavia.jpg";

interface FormRegisterUserProps {
  validateFormRegister: any;
  setValidateFormRegister: any;
}

const FormRegisterUser: FC<FormRegisterUserProps> = ({
  validateFormRegister,
  setValidateFormRegister,
}) => {
  const [values, setValues] = useState<object>({
    firstName:"",
    middleName:"",
    lastName:"",
    secondLastName:"",
    email:"",
    password:"",
  });
  const [viewPass, setViewPass] = useState<boolean>(false);
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const close = () => {
    setValidateFormRegister(false);
  };
  return (
    <div>
      <Modal
        open={validateFormRegister}
        onCancel={() => {
          close();
        }}
        footer={[]}
      >
        <div>
          <div className="container-center">
            <img
              src={logoHeaderLogin}
              className="img-fluid w-100"
              style={{ height: 160 }}
              alt=""
            />
          </div>
          <Form initialValues={{ remember: true }}>
            <div>
              <label
                htmlFor="user_id"
                className="form-label "
                style={fontLabelComponent(false)}
              >
                Primer Nombre
              </label>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduzca su primer nombre",
                    
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
                Segundo Nombre
              </label>

              <Input
                type="text"
                className="form-control"
                id="user_id"
                name="middleName"
                autoComplete="off"
                style={fontLabelComponent(true)}
                onChange={onChange}
                maxLength={20}

              />
            </div>
            <div>
              <label
                htmlFor="user_id"
                className="form-label "
                style={fontLabelComponent(false)}
              >
                Primer Apellido
              </label>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduzca su primer apellido",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="form-control"
                  id="user_id"
                  name="lastName"
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
                Segundo Apellido
              </label>
              <Input
                type="text"
                className="form-control"
                id="user_id"
                name="secondLastName"
                autoComplete="off"
                style={fontLabelComponent(true)}
                onChange={onChange}
                maxLength={20}

              />
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
                    message: "La contraseña debe contener mínimo 8 caracteres",
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

              <hr />
              <div className="buttonRegisterUser">
                <button className="btn btn-primary">Registrarse</button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default FormRegisterUser;
