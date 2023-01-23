import React from "react";
import { RouterComponentList } from '../constants/router/routers.components'

export default class RouterComponent extends React.Component {

    exportRouter = () => {
        try {
            const listaRutas = RouterComponentList()
            const { location } = window
            return listaRutas.map((item: { key: string, ruta: string, component: any }) => {
                if (location.pathname === item.ruta) return item.component
            })
        } catch (error) {
            console.log("Ocurrio un error grave al momento de ir la ruta", error);
        }
    }

    render(): React.ReactNode {
        return (<><div style={{background: '#F5F9FD' }}>{this.exportRouter()}</div></>);
    }
}