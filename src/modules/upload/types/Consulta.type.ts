import { TabsProps } from "antd";

export type MyProps = {
    
};
export type MyState = {
    jsonAlert: any,

    listEnfermedades: any[],
    listIps: any[],

    columnas: any,

    tabTablaConsulta: boolean,
    tabInformacionDetalle: boolean,
    tabLogErrores: boolean,

    idEnfermedad: number,
    idIps: number,
    tipoDocumento: string | any,
    numeroDocumento: string | any,
    desde: string | any,
    hasta: string | any,
    activeKey: string
    items: TabsProps['items']
};