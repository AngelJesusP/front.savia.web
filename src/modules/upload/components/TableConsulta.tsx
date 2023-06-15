import { FC } from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";
import moment from "moment";
import { Popover, TablePaginationConfig } from "antd";
import { SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

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
    {
      title: "Ubicación",
      dataIndex: "index",
      key: "index",
      width: "5%",
      align: "center",
      render: (text: any, record: any, index: any) => index + 1,
    },
    { title: "Primer nombre", dataIndex: "primerNombre", align: "center" },
    { title: "Segundo nombre", dataIndex: "segundoNombre", align: "center" },
    { title: "Primer apellido", dataIndex: "primerApellido", align: "center" },
    {
      title: "Segundo apellido",
      dataIndex: "segundoApellido",
      align: "center",
    },
    {
      title: "Tipo identificación",
      dataIndex: "tipoIdentificacion",
      align: "center",
    },
    {
      title: "Número identificación",
      dataIndex: "numeroIdentificacion",
      align: "center",
    },
    {
      title: "Código BDUA",
      dataIndex: "codigoBdua",
      align: "center",
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "fechaNacimiento",
      align: "center",
    },
    {
      title: "Fecha de afiliación",
      dataIndex: "fechaAfilicion",
      align: "center",
      render: (date: any) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Fecha de egreso",
      dataIndex: "fechaEgreso",
      align: "center",
    },
    {
      title: "Prestador",
      dataIndex: "prestador",
      align: "center",
    },
    {
      title: "Novedades",
      dataIndex: "novedades",
      align: "center",
      filters: novedades?.map((novedad: any) => ({
        text: (
          <Popover
            style={{ zIndex: 10000 }}
            trigger="hover"
            content={novedad?.novDescripcion}
          >
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
