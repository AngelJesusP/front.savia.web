import { TablePaginationConfig } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import axios from "axios";
import { useState } from "react";
const originUrl = import.meta.env.VITE_URL;

const useTable = (
  initialFilters: { page: number, limit: number, [key: string]: any;},
  path: string,
  method: "GET" | "POST" = "GET"
) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    total: 0,
    filters: initialFilters,
  });


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
    await await getData({ ...state.filters, ...filters, page: pagination.current, limit: pagination.pageSize});
    console.log('cambio tabla', pagination);
  };


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
