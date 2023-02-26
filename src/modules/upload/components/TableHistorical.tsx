import { Card, Form, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import Table from "../../../utils/components/Table";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import useTable from "../hooks/useTable";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import ModalPatients from "./ModalPatients";

const TableHistorical = () => {
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { filters, data, loading, total,  getData, resetFilters, handleTableChange } = useTable(
    {
      limit: 10,
      page: 1,
      idEnfermedad: null,
    },
    "/api/v1/historico/archivo"
  );

  useEffect(() => {
    getListEnfermedadesConsulta();
  }, []);

  const onSubmit = async (values: any) => {
    await getData({ ...filters, ...values });
  };

  const getListEnfermedadesConsulta = async () => {
    await getListEnfermedades().then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        const list: Ienfermedades[] = data.data;
        const { convert } = convertListToSelect(list);
        setListEnfermedades(convert);
      }
    });
  };

  const columnas = [
    { title: "Id", dataIndex: "id" },
    { title: "Nombre", dataIndex: "nombreArchivo" },
    { title: "clave", dataIndex: "claveArchivo" },
    {
      title: "Fecha",
      dataIndex: "fechaCargue",
      render: (date: any) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Detalle",
      fixed: "right",
      render: (data: any) => {
        return <ModalPatients idEnfermedad={filters.idEnfermedad} claveArchivo={data.claveArchivo}  />;
      },
    },
  ];

  return (
    <div className="container-fluid">
      <Card>
        <Form
          name="wrap"
          layout="vertical"
          colon={false}
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            label="Seleccionar un enfermedad"
            name="idEnfermedad"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Select
              // disabled={activeKey === "2"}
              className="w-100"
              showSearch
              placeholder="Selecciona la enfermedad"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listEnfermedades}
            />
          </Form.Item>

          <hr />

          <button
            type="button"
            onClick={() => {
              form.resetFields();
              resetFilters();
            }}
            className="btn btn-outline-primary me-3"
          >
            Limpiar
          </button>
          <button
            type="submit"
              disabled={loading}
            className="btn btn-primary"
          >
            Consultar
          </button>
        </Form>
      </Card>
      <Card className="mt-3">
        <Table
          columns={columnas}
          items={data}
          with_pagination
          paginationTop
          loading={loading}
          count={total}
          handleTableChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default TableHistorical;
