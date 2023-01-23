import { Content } from "antd/es/layout/layout"
import { DashboardComponent } from "../../../modules/home/components/dashboard"
import QueryRegister from "../../../modules/upload/views/uploadFile"
import { RUTA_HOME, RUTA_CONSULTA } from "./router.router"

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
            component: <QueryRegister />
        }
    ]
}