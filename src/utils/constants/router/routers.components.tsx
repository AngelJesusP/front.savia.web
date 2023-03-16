import { Content } from "antd/es/layout/layout"
import { DashboardComponent } from "../../../modules/home/components/dashboard"
import { ListReports } from "../../../modules/reports/views/ListReports"
import CreateFile from "../../../modules/upload/views/CreateFile"
import UploadFile from "../../../modules/upload/views/uploadFile"
import { RUTA_HOME, RUTA_CONSULTA, RUTA_REPORTES, RUTA_CARGA } from "./router.router"

export const RouterComponentList = () => {
    return [
        {
            key: '1',
            ruta: RUTA_HOME,
            component: <>
                <DashboardComponent />
                <Content className='dashboard-footer-home'></Content>
            </>
        },
        {
            key: '2',
            ruta: RUTA_CONSULTA,
            component: <UploadFile />
        },
        {
            key: '3',
            ruta: RUTA_CARGA,
            component: <CreateFile />
        },
        {
            key: '4',
            ruta: RUTA_REPORTES,
            component: <ListReports />
        }
    ]
}