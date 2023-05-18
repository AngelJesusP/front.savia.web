import { useEffect, useState } from "react";
import { Card, Form, message, Select, DatePicker } from "antd";
import { getReports } from "../service/reports.service";
import { CollapseFolders } from "../components/CollapseFolders";
import { getListEnfermedades } from "../../../utils/api/api";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import moment from "moment";

export const ListReports = () => {
  const [form] = Form.useForm();
  const [folders, setFolders] = useState([]);
  const [clave, setClave] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [listEnfermedades, setListEnfermedades] = useState([{}]);
  const [valid, setValid] = useState(false);
  const [newValue, setNewValue] = useState({
    enfermedad: 0,
    fecha: new Date(),
  });
  const [refresh, setRefresh] = useState(false);

  const listFolders = async (values: any) => {
    const { enfermedad, fecha } = values;
    if (typeof enfermedad !== "undefined" || typeof fecha !== "undefined") {
      const fechaYYYMM = moment(fecha.toISOString()).format("YYYY-MM");
      const dataRequest = `${enfermedad};${fechaYYYMM}`;
      const response = await getReports(dataRequest);
      if (response?.data[0]?.replace(/[\[\]]/g, "")) {
        setFolders(response?.data[0]?.replace(/[\[\]]/g, "").split(","));
      } else {
        setFolders([]);
        messageApi.open({
          type: "error",
          content: "La enfermedad no tiene carpetas existentes",
        });
      }
      setClave(dataRequest);
    }
  };

  useEffect(() => {
    form.submit();
  }, [refresh]);

  const getListEnf = async () => {
    await getListEnfermedades().then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        const list: [] = data.data;
        const { convert } = convertListToSelect(list);
        setListEnfermedades(convert);
      }
    });
  };

  useEffect(() => {
    getListEnf();
  }, []);

  const change = (value: any) => {
    setNewValue({ enfermedad: value, fecha: new Date() });
    setValid(true);
  };

  return (
    <div className="container">
      {contextHolder}
      <Card
        title="Filtros"
        className="mt-3"
        actions={[
          <div key="button-search" className="d-flex justify-content-end me-3">
            <button
              onClick={() => {
                form.submit();
              }}
              className="btn btn-primary "
              type="submit"
              disabled={!valid}
            >
              Buscar
            </button>
          </div>,
        ]}
      >
        <Form
          name="ReportsFilters"
          layout="vertical"
          colon={false}
          onFinish={listFolders}
          form={form}
        >
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item label="Enfermedad" name="enfermedad">
                <Select options={listEnfermedades} onChange={change} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item label="Fecha" name="fecha">
                <DatePicker picker="month" style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>

      <Card title="Reportes" className="mt-3">
        <CollapseFolders
          clave={clave}
          listFolders={listFolders}
          refresh={refresh}
          setRefresh={setRefresh}
          folders={folders}
          newValue={newValue}
        />
      </Card>
    </div>
  );
};
