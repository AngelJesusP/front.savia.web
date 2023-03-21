import { TablePaginationConfig } from "antd";
import { SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import axios from "axios";
import { useState } from "react";
const originUrl = import.meta.env.VITE_URL;

const useTable = (
  initialFilters: { page: number; limit: number; [key: string]: any },
  path: string,
  method: "GET" | "POST" = "GET"
) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    total: 0,
    filters: initialFilters,
  });

  /**
   * Restablezca los filtros a su estado inicial y configure los datos, la carga y el total a su estado
   * inicial.
   */
  const resetFilters = async () => {
    await setState({
      data: [],
      loading: false,
      total: 0,
      filters: initialFilters,
    });
  };

  const handleTableChange = async (
    pagination: TablePaginationConfig,
    filters: Record<string, string | number | boolean | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    await await getData({
      ...state.filters,
      ...filters,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  /**
   * Voy a configurar el estado para que se cargue, luego intentaré obtener algunos datos y, si obtengo
   * algunos datos, configuraré el estado para que no se cargue y configuraré los datos en los datos
   * que tengo, y establezco el total en el total que obtuve, y establezco los filtros en los filtros
   * que obtuve, y luego voy a devolver los datos que obtuve, y si no obtengo ningún dato, voy a
   * rechazar el error.
   * @param {any} _filters - cualquiera -&gt; este es el objeto que contiene los filtros que quiero
   * pasar a la API
   * @returns Se devuelve la respuesta.datos.datos.
   */
  const getData = async (_filters: any) => {
    setState({ ...state, loading: true });
    try {
      let response: any;
      if (method === "POST") {
        response = await axios.post(`${originUrl}${path}`, _filters);
      } else {
        response = await axios.get(`${originUrl}${path}`, {
          params: {
            ..._filters,
          },
        });
      }
      setState({
        ...state,
        loading: false,
        data: response.data.data,
        total: response.data.items?.replace(/[\[\]]/g, "") || null,
        filters: _filters,
      });
      return response.data;
    } catch (error) {
      Promise.reject(error);
    }
  };

  return {
    ...state,
    getData,
    resetFilters,
    setState,
    handleTableChange,
  };
};

export default useTable;
