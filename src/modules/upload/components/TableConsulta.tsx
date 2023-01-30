import { Pagination, PaginationProps } from "antd";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import React from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";

export default class TableConsulta extends React.Component {
  /* Columnas para la tabla de paciente */
  columnas: (ColumnGroupType<any> | ColumnType<any>)[] = [
    { title: "Id", dataIndex: "id", width: "5%" },
    { title: "Primer Nombre", dataIndex: "primer_nombre" },
    { title: "Segundo Nombre", dataIndex: "segundo_nombre" },
    { title: "Primer Apellido", dataIndex: "primer_apellido" },
    { title: "Segundo apellido", dataIndex: "segundo_apellido" },
    { title: "Tipo Identificación", dataIndex: "tipo_identificacion" },
    {
      title: "Número Identificación",
      dataIndex: "numero_identificacion",
      width: "13%",
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "fecha_nacimiento",
      width: "10%",
    },
    { title: "Sexo", dataIndex: "sexo", width: "3%" },
    {
      title: "Código Pertenencia Etnica",
      dataIndex: "codigo_pertenencia_etnica",
      width: "15%",
    },
    {
      title: "Detalle",
      fixed: "right",
      render: (item: any) => (
        <span
          style={{ cursor: "pointer" }}
          className="text-primary"
          onClick={async () => {
            // const { dataTable } = await dataTestForDatatable(false, item.id)
            // this.setState({ navegacion: false, activacion: "2", idVerDetalle: item.id, dataForDatatableDetalle: dataTable })
          }}
        >
          Ver detalle
        </span>
      ),
    },
  ];

  itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") return <a>Anterior</a>;
    if (type === "next") return <a>Siguiente</a>;
    return originalElement;
  };

  render(): React.ReactNode {
    return (
      <div>
        <Table
          
          columns={this.columnas}
          items={[]}
        />

        <Pagination
          total={500}
          itemRender={this.itemRender}
          style={{ marginTop: 10 }}
        />
        <div className="d-flex justify-content-end ">
          <ProgressFile />
        </div>
      </div>
    );
  }
}
