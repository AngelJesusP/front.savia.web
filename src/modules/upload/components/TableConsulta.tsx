import { FC } from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";
import moment from "moment";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

interface ITableConsulta {
  total: number;
  loading: boolean;
  data: any[];
  filters: any;
  novedades: string[];
  handleTableChange:  ((pagination: TablePaginationConfig, filters: Record<string, string | number | boolean | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void);
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
    filters = { ...filters, novedades: filters?.novedades?.toString() || null}
    console.log('filtros', filters);
    
    handleTableChange(pagination,
      filters,
      sorter,
      extra,)
  };
  

  const columnas = [
    { title: "Id", dataIndex: "id" },
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
      filters: novedades?.map((novedad) => ({
        text: novedad,
        value: novedad,
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
