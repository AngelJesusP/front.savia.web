import React from "react";
import { RouterComponentList } from "../constants/router/routers.components";

export default class RouterComponent extends React.Component {
  /* Una función que devuelve una lista de componentes. */
  exportRouter = () => {
    try {
      const listaRutas = RouterComponentList();
      const { location } = window;

      return listaRutas.map(
        (item: { key: string; ruta: string; component: any }) => {
          if (location.pathname === item.ruta) {
            return item.component;
          }
          //   else {
          //     return listaRutas[0].component;
          //   }
        }
      );
    } catch (error) {
      //console.log("Ocurrió un error grave al momento de ir la ruta", error);
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <div className="h-100" style={{ background: "#F5F9FD" }}>
          {this.exportRouter()}
        </div>
      </>
    );
  }
}
