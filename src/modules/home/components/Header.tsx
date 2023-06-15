import logoHeader from "../../../utils/assets/img/conexionSavia.png";
import { Button, Popover, Badge, Space, Empty } from "antd";
import { styleMenuHamburguesa, styleNotificacion, styleUserName, styleimgHeader } from "../styles/styleHeader";
import { nametoken } from "../../../utils/constants/token/nameToken";
import { BellTwoTone, MailOutlined } from "@ant-design/icons";
import { TemplateContext } from "../../../utils/components/TemplateContext";
import { useContext, useState } from "react";

const cerrarSesion = () => {
  let { localStorage } = window;
  if (localStorage.getItem(nametoken)) {
    localStorage.removeItem(nametoken);
  }
  window.location.href = "/savia/login";
};

const content = (
  <div className="w-100 p-0">
    <hr />
    <span
      className="text-primary"
      onClick={() => cerrarSesion()}
      style={{ cursor: "pointer" }}>
      Cerrar sesión
    </span>
  </div>
);

export const HeaderComponent = () => {
  const [name, setName] = useState(localStorage.getItem("name"))
  const context = useContext(TemplateContext);

  return (
    <nav className="bg-white w-100" style={{ padding: 6, height: 45 }}>
      <img
        src={logoHeader}
        className="img-fluid"
        style={styleimgHeader}
        alt=""
      />

      <Popover
        placement="bottomRight"
        title={name}
        content={content}
        trigger="click"
      >
        <Button
          className="p-0"
          type="primary"
          style={styleMenuHamburguesa}
          shape="circle"
        >
          M
        </Button>
      </Popover>

      <Popover
        placement="bottomRight"
        title="Notificación"
        content={
          <>
            {context.notifications ? (
              <div className="d-flex align-items-center">
                <MailOutlined />
                <span className="ms-3"></span>
              </div>
            ) : (
              <Empty description={"No hay notificaciones pendientes"} />
            )}
          </>
        }
        trigger="click"
      >
        <Space style={styleNotificacion}>
          <Badge status="success" dot color="#87d068" count>
            <BellTwoTone style={{ fontSize: 20 }} />
          </Badge>
        </Space>
      </Popover>
      <span style={styleUserName}>
        Bienvenido/a, <span style={{ fontWeight: "bold" }}>{name}</span>{" "}
      </span>
    </nav>
  );
};
