import { useEffect, FC, useState } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import ProgressFile from "./ProgressFile";

interface ITableGeneric {
  data: any[];
  loading: boolean;
  total: number | null;
  filters: IConsulta;
  getData: any;
}

const TableGeneric: FC<ITableGeneric> = ({ data, loading, total, filters, getData }) => {

  const [colums, setColumns] = useState();
  

  const change_page = async (page: number, pageSize?: number) => {
    await getData({
      ...filters,
      page,
      limit: pageSize,
    });
  };

  useEffect(() => {    
   if(data.length > 0 ) {
    const columsForJson: any = Object.keys(data[0]).map((key) => {
      return {
        title: `${key.split("_").join(" ")}`,
        dataIndex: `${key}`,
        key: `${key}`,
      };
    });
    if(columsForJson.length) setColumns(columsForJson)
   }
  }, [data]);

  return (
    <>
      <Table
        items={data}
        columns={colums}
        with_pagination
        paginationTop
        count={total ? total : 0}
        loading={loading}
        change_page={change_page}
      />
      <div className="d-flex justify-content-end ">
        <ProgressFile />
      </div>
    </>
  );
};

export default TableGeneric;
