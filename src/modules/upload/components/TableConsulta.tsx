import { FC } from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";
import moment from "moment";
import { Popover, TablePaginationConfig } from "antd";
import {
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";

interface ITableConsulta {
  total: number;
  loading: boolean;
  data: any[];
  filters: any;
  novedades: string[];
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, string | number | boolean | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;
}

const TableConsulta: FC<ITableConsulta> = ({
  total,
  loading,
  data,
  filters,
  novedades,
  handleTableChange,
}) => {
  const tableChange = async (
    pagination: TablePaginationConfig,
    filters: Record<string, string | number | boolean | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    filters = { ...filters, novedades: filters?.novedades?.toString() || "" };

    handleTableChange(pagination, filters, sorter, extra);
  };

  const columnas = [
    // { title: "Id", dataIndex: "id" },
    { title: "Primer nombre", dataIndex: "primerNombre" },
    { title: "Segundo nombre", dataIndex: "segundoNombre" },
    { title: "Primer apellido", dataIndex: "primerApellido" },
    { title: "Segundo apellido", dataIndex: "segundoApellido" },
    {
      title: "Tipo identificación",
      dataIndex: "tipoIdentificacion",
    },
    {
      title: "Número identificación",
      dataIndex: "numeroIdentificacion",
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "fechaNacimiento",
    },
    {
      title: "Fecha de afiliación",
      dataIndex: "fechaAfilicion",
      render: (date: any) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Fecha de egreso",
      dataIndex: "fecha_egreso",
    },
    {
      title: "Prestador",
      dataIndex: "prestador",
    },
    {
      title: "Novedades",
      dataIndex: "novedades",
      filters: novedades?.map((novedad: any) => ({
        text: (
          <Popover style={{zIndex: 10000}} trigger="hover" content={novedad?.novDescripcion}>
            <span>{`Novedad ${novedad?.novCodigo}`}</span>
          </Popover>
        ),
        value: novedad?.novCodigo,
      })),
      filterMode: "tree",
      filterSearch: true,
    },
  ];

  return (
    <div>
      <Table
        columns={columnas}
        items={data || []}
        with_pagination
        paginationTop
        loading={loading}
        count={total || undefined}
        handleTableChange={tableChange}
      />
      <div className="d-flex justify-content-end ">
        <ProgressFile filters={{ ...filters, bandera: true }} />
      </div>
    </div>
  );
};

export default TableConsulta;
