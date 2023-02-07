import { ColumnGroupType, ColumnType } from "antd/es/table";
import React from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";

export default class TableConsulta extends React.Component<{
  handleChangeConsulta: any;
  setTabInformacionDetalle: any;
  data: any[];
  loading: boolean;
  total: number | null;
  setIdPaciente: any;
  filters: IConsulta;
}> {
  constructor(props: any) {
    super(props);
  }

  change_page = async (page: number, pageSize?: number) => {
    await this.props.handleChangeConsulta({
      ...this.props.filters,
      page,
      limit: pageSize,
    });
  };

  /* Columnas para la tabla de paciente */
  columnas: (ColumnGroupType<any> | ColumnType<any>)[] = [
    { title: "Id", dataIndex: "id" },
    { title: "Primer nombre", dataIndex: "primerNombre" },
    { title: "Segundo nombre", dataIndex: "segundoNombre" },
    { title: "Primer apellido", dataIndex: "primerApellido" },
    { title: "Segundo apellido", dataIndex: "segundoApellido" },
    { title: "Tipo identificación", dataIndex: "tipoIdentificacion" },
    {
      title: "Número identificación",
      dataIndex: "numeroIdentificacion",
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "fechaNacimiento",
    },
    { title: "Sexo", dataIndex: "sexo" },
    {
      title: "Código pertenencia étnica",
      dataIndex: "codigoPerteneneciaEtnica",
    },
    {
      title: "Detalle",
      fixed: "right",
      dataIndex: "idDetalle",
      render: (id: number) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            className="text-primary"
            onClick={async () => {
              this.props.setTabInformacionDetalle("2");
              this.props.setIdPaciente(id);
            }}
          >
            Ver detalle
          </span>
        );
      },
    },
  ];

  render(): React.ReactNode {
    return (
      <div>
        <Table
          columns={this.columnas}
          items={this?.props?.data || []}
          with_pagination
          paginationTop
          loading={this.props.loading}
          count={this.props.total ? this.props.total : undefined}
          change_page={this.change_page}
        />
        <div className="d-flex justify-content-end ">
          <ProgressFile />
        </div>
      </div>
    );
  }
}
