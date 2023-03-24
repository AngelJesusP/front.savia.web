import { Card, Modal, Tabs, TabsProps } from "antd";
import { FC, useState, useEffect } from "react";
import useTable from "../hooks/useTable";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getNews } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import TableConsulta from "./TableConsulta";
import TableGeneric from "./TableGeneric";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

interface IModalPatients {
  claveArchivo: string;
  idEnfermedad: number;
}

const constantAlertJson = {
  message: "",
  type: "error",
  hidden: true,
};

const ModalPatients: FC<IModalPatients> = ({ claveArchivo, idEnfermedad }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    if (isVisible) {
      getNovedades();
    }
  }, [isVisible]);

  const getNovedades = async () => {
    const resp = await getNews(idEnfermedad);

    setNovedades(resp);
  };

  const open = async () => {
    setIsVisible(true);
    await onSubmit({ idEnfermedad });
  };
  const close = () => setIsVisible(false);

  const {
    filters,
    data,
    loading,
    total,
    getData,
    resetFilters,
    handleTableChange,
  } = useTable(
    {
      idEnfermedad: -1,
      idIps: null,
      tipoDocumento: "",
      documento: "",
      desde: "",
      hasta: "",
      page: 1,
      limit: 10,
      claveArchivo: claveArchivo,
      novedades: "",
    },
    "/api/v1/consulta/paciente",
    "POST"
  );

  const onSubmit = async (values: any) => {
    setJsonAlert(constantAlertJson);
    const dataFinal: IConsulta = {
      claveArchivo: claveArchivo,
      novedades: "",
      idEnfermedad: idEnfermedad || -1,
      idIps: values?.idIps || null,
      tipoDocumento: values?.document?.type || "",
      documento: values?.document?.number || "",
      desde: "",
      /* values?.desde ||
        moment(new Date(values?.rangePicker[0])).format("YYYY-MM-DD"),*/
      hasta: "",
      /* values?.hasta ||
        moment(new Date(values?.rangePicker[1])).format("YYYY-MM-DD"),*/
      page: values.page || 1,
      limit: values.limit || 10,
    };

    const { data, message } = await getData(dataFinal);
    if (data.length === 0)
      setJsonAlert({ type: "warning", hidden: false, message: message || "" });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <CheckCircleTwoTone />
          Registros exitosos
        </span>
      ),
      children: (
        <>
          <FormFilters
            onSubmit={onSubmit}
            onClear={resetFilters}
            jsonAlert={jsonAlert}
            loading={loading}
            values={{ idEnfermedad }}
            type="patient"
          />
          <Card className="mt-3">
            <TableConsulta
              total={total}
              loading={loading}
              data={data}
              filters={filters}
              novedades={novedades}
              handleTableChange={handleTableChange}
            />
          </Card>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <CloseCircleTwoTone />
          Log de errores
        </span>
      ),
      children: <TableGeneric idEnfermedad={idEnfermedad} />,
    },
  ];

  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        className="text-primary"
        onClick={open}
      >
        Ver detalle
      </span>
      <Modal
        style={{ top: 20 }}
        className="modal-patients"
        open={isVisible}
        onCancel={close}
        width={"85%"}
        bodyStyle={{ padding: 0 }}
        footer={[]}
      >
        <Tabs defaultActiveKey="1" items={items} />
        {/* <FormFilters
          onSubmit={onSubmit}
          onClear={resetFilters}
          jsonAlert={jsonAlert}
          loading={loading}
          values={{ idEnfermedad }}
          type="patient"
        /> */}
        {/* {data.length > 0 && ( */}
        {/* <Card className="mt-3">
          <TableConsulta
            total={total}
            loading={loading}
            data={data}
            filters={filters}
            novedades={novedades}
            handleTableChange={handleTableChange}
          />
        </Card> */}
        {/* )} */}
      </Modal>
    </>
  );
};

export default ModalPatients;
