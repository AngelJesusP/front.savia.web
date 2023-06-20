import { Content } from "antd/es/layout/layout";
import { DashboardComponent } from "../../../modules/home/components/dashboard";
import { ListReports } from "../../../modules/reports/views/ListReports";
import CreateFile from "../../../modules/upload/views/CreateFile";
import UploadFile from "../../../modules/upload/views/uploadFile";
import {
  RUTA_HOME,
  RUTA_CONSULTA,
  RUTA_REPORTES,
  RUTA_CARGA,
  RUTA_VALIDATIONS,
  CONSULTAR_CARGUE,
  CREAR_USUARIO
} from "./router.router";
import { CreateValidations } from "../../../modules/validations/view/CreateValidations";
import { ConsultCharge } from "../../../modules/upload/views/ConsultCharge";
import ValidationCreate from "../../../modules/auth/components/ValidationCreate";

export const RouterComponentList = () => {
  return [
    {
      key: "1",
      ruta: RUTA_HOME,
      component: (
        <>
          <DashboardComponent />
          <Content className="dashboard-footer-home"></Content>
        </>
      ),
    },
    {
      key: "2",
      ruta: RUTA_CONSULTA,
      component: <UploadFile />,
    },
    {
      key: "3",
      ruta: RUTA_CARGA,
      component: <CreateFile />,
    },
    {
      key: "4",
      ruta: RUTA_REPORTES,
      component: <ListReports />,
    },
    {
      key: "5",
      ruta: RUTA_VALIDATIONS,
      component: <CreateValidations />,
    },
    {
      key: "6",
      ruta: CONSULTAR_CARGUE,
      component: <ConsultCharge />,
    },
    {
      key: "7",
      ruta: CREAR_USUARIO,
      component: <ValidationCreate />,
    },
  ];
};
