import { Card, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import Table from "../../../utils/components/Table";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import ModalPatients from "./ModalPatients";

const TableHistorical = () => {
  const change_page = async (page: number, pageSize?: number) => {};

  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  useEffect(() => {
    getListEnfermedadesConsulta();
  }, []);

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
    { title: "Nombre", dataIndex: "name" },
    { title: "Archivo", dataIndex: "file" },
    { title: "clave", dataIndex: "name" },
    { title: "Fecha", dataIndex: "date" },
    {
      title: "Detalle",
      fixed: "right",
      dataIndex: "idDetalle",
      render: (id: number) => {
        return (
          <ModalPatients />
        );
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
          // onFinish={onSubmit}
          // form={form}
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
              // form.resetFields();
              // onClear();
            }}
            className="btn btn-outline-primary me-3"
          >
            Limpiar
          </button>
          <button
            type="submit"
            //   disabled={loading || activeKey === "2"}
            className="btn btn-primary"
          >
            Consultar
          </button>
        </Form>
      </Card>
      <Card className="mt-3">
        <Table
          columns={columnas}
          items={[{
            id: 1,
            name: 'Karen',
            file: 'archivo',
            date: '11/11/2022'
          }]}
          with_pagination
          paginationTop
          // loading={loading}
          //   count={}
          change_page={change_page}
        />
      </Card>
    </div>
  );
};

export default TableHistorical;
