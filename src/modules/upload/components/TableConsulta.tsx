import { useState } from "react";
import ProgressFile from "./ProgressFile";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import moment from "moment";
import { onClickConsultar } from '../service/enfermedades.services'


const TableConsulta = () => {

  const constantAlertJson = {
    message: "",
    type: "error",
    hidden: true,
  };

  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
  const [filters, setFilters] = useState<IConsulta>({
    idEnfermedad: -1,
    idIps: null,
    tipoDocumento: "",
    documento: "",
    desde: "",
    hasta: "",
    page: 1,
    limit: 10,
  });

  const change_page = async (page: number, pageSize?: number) => {
    
  };

  const getData = async (values: any) => {
    setJsonAlert(constantAlertJson);
    setLoading(true);
    const dataFinal: IConsulta = {
      idEnfermedad: values?.idEnfermedad || -1,
      idIps: values?.idIps || null,
      tipoDocumento: values?.document?.type || "",
      documento: values?.document?.number || "",
      desde:
        values?.desde ||
        moment(new Date(values?.rangePicker[0])).format("YYYY-MM-DD"),
      hasta:
        values?.hasta ||
        moment(new Date(values?.rangePicker[1])).format("YYYY-MM-DD"),
      page: values.page || 1,
      limit: values.limit || 10,
    };
    let valuesResponse;

    const { data } = await onClickConsultar(dataFinal);
    valuesResponse = data;
    setData(valuesResponse?.data || []);
    setFilters(dataFinal);
    setJsonAlert({ ...jsonAlert, message: valuesResponse?.message || "" });
    setTotal(Number(valuesResponse?.items?.replace(/[\[\]]/g, "")) || null);
    setLoading(false);
  };

  const columnas  = [
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
        change_page={change_page}
      />
      <div className="d-flex justify-content-end ">
        <ProgressFile filters={{...filters,  bandera: true}} />
      </div>
    </div>
  );
}

export default TableConsulta
