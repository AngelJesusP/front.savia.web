import { useState } from "react";
import { Card, Form, Input, message } from "antd";
import { getFolders } from "../service/reports.service";
import { CollapseFolders } from "../components/CollapseFolders";

export const ListReports = () => {
  const [form] = Form.useForm();
  const [folders, setFolders] = useState([]);
  const [clave, setClave] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const listFolders = async (values: any) => {
    const resp = await getFolders(values?.claveArchivo);
    if (resp?.data[0]?.replace(/[\[\]]/g, "")) {
      setFolders(resp?.data[0]?.replace(/[\[\]]/g, "").split(","));
    } else {
      setFolders([]);
      messageApi.open({
        type: "error",
        content: "La clave del archivo no tiene carpetas existentes",
      });
    }
    setClave(values?.claveArchivo);
  };

  return (
    <div className="container">
      {contextHolder}
      <Card
        title="filtros"
        className="mt-3"
        actions={[
          <div key="button-search" className="d-flex justify-content-end me-3">
            <button
              onClick={() => {
                form.submit();
              }}
              className="btn btn-primary "
              type="submit"
              disabled={!clave}
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
            <div className="col-12">
              <Form.Item name="claveArchivo" noStyle>
                <Input
                  placeholder="Clave del archivo"
                  onChange={({ target }) => setClave(target.value)}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>

      <Card title="Reportes" className="mt-3">
        <CollapseFolders
          clave={clave}
          listFolders={listFolders}
          folders={folders}
        />
      </Card>
    </div>
  );
};
