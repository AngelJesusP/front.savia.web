import { Card, Tabs, TabsProps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import {
  getLogErrors,
  onClickConsultar,
} from "../service/enfermedades.services";
import TableConsulta from "../components/TableConsulta";
import TablePatientDetail from "../components/TablePatientDetail";
import TableGeneric from "../components/TableGeneric";
import FormFilters from "../components/FormFilters";

const UploadFile = () => {
  const constantAlertJson = {
    message: "",
    type: "error",
    hidden: true,
  };

  const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
  const [activeKey, setActiveKey] = useState("1");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number | null>(null);
  const [idPaciente, setIdPaciente] = useState<number | null>(null);
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
    if (activeKey === "1") {
      const { data } = await onClickConsultar(dataFinal);
      valuesResponse = data;
    } else if (activeKey === "3") {
      const { data } = await getLogErrors(dataFinal);
      valuesResponse = data;
    }

    

    setFilters(dataFinal);
    setData(valuesResponse?.data || []);
    setJsonAlert({ ...jsonAlert, message: valuesResponse?.message || "" });
    setTotal(Number(valuesResponse?.items?.replace(/[\[\]]/g, "")) || null);
    setLoading(false);
  };

  useEffect(() => {
    onClear();
  }, [activeKey]);


  const onClear = () => {
    setFilters({
      idEnfermedad: -1,
      idIps: null,
      tipoDocumento: "",
      documento: "",
      desde: "",
      hasta: "",
      page: 1,
      limit: 10,
    });
    setTotal(null);
    setLoading(false);
    setData([]);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Consulta de datos cargados`,
      children: (
        <TableConsulta
          handleChangeConsulta={getData}
          setTabInformacionDetalle={setActiveKey}
          data={data}
          loading={loading}
          setIdPaciente={setIdPaciente}
          total={total}
          filters={filters}
        />
      ),
      disabled: false,
    },
    {
      key: "2",
      label: `Detalle de una paciente`,
      children: (
        <TablePatientDetail
          returnToConsultation={setActiveKey}
          idPaciente={idPaciente}
        />
      ),
      disabled: true,
    },
    {
      key: "3",
      label: `Log de errores`,
      children: (
        <TableGeneric
          data={data}
          loading={loading}
          total={total}
          filters={filters}
          getData={getData}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <FormFilters
          onClear={onClear}
          activeKey={activeKey}
          jsonAlert={jsonAlert}
          loading={loading}
          onSubmit={getData}
        />
        <Card className="mt-4">
          <Tabs
            onChange={(key: string) => {
              setActiveKey(key);
            }}
            activeKey={activeKey}
            items={items}
          />
        </Card>
      </div>
    </>
  );
};

export default UploadFile;
