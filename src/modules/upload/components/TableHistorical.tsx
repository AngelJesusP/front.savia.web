import { Card, Form, Select, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getListEnfermedades } from "../../../utils/api/api";
import Table from "../../../utils/components/Table";
import { convertListToSelect } from "../../../utils/constants/convertToList";
import { createFolders } from "../../reports/service/reports.service";
import useTable from "../hooks/useTable";
import { Ienfermedades } from "../interfaces/enfermedades.interfaces";
import ModalPatients from "./ModalPatients";
import { Alert } from "../../../utils/components/Alert";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

const TableHistorical = () => {
  const [listEnfermedades, setListEnfermedades] = useState<any[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    hidden: boolean;
  }>({
    message: "",
    type: "error",
    hidden: true,
  });
  const [form] = Form.useForm();
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
    const { data } = await getData({ ...filters, ...values });
    if (data.length === 0)
      setAlert({ message: "No hay registros", hidden: false, type: "warning" });
    else {
      setAlert({ message: "", hidden: true, type: "info" });
    }
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
    {
      title: "Id",
      render: (data1: any, data2: any, index: number) =>
        filters.page === 1 ? index + 1 : (filters.page - 1) * 10 + index + 1,
    },
    { title: "Nombre", dataIndex: "nombreArchivo" },
    { title: "clave", dataIndex: "claveArchivo" },
    {
      title: "Fecha",
      dataIndex: "fechaCargue",
      render: (date: any) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Estado",
      dataIndex: "estadoArchivo",
      align: 'center',
      render: (status: string) => {
        return (
          <Tag
            color={
              status === "1"
                ? "processing"
                : status === "2"
                ? "success"
                : "warning"
            }
            icon={
              status === "1"
                ? <SyncOutlined spin />
                : status === "2"
                ? <CheckCircleOutlined />
                : <CloseCircleOutlined />
            }
          >
            {status === "1"
              ? "Proceso"
              : status === "2"
              ? "Completado"
              : "Cancelado"}
          </Tag>
        );
      },
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: "Detalle",
          fixed: "right",
          align: "center",
          render: (data: any) => {
            return (
              <ModalPatients
                idEnfermedad={filters.idEnfermedad}
                claveArchivo={data.claveArchivo}
              />
            );
          },
        },
        {
          title: "Crear carpetas",
          fixed: "right",
          align: "center",
          render: (data: any) => {
            console.log(data);

            if (data?.estadoArchivo === "2") {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  // className="text-primary"
                  onClick={async () => {
                    const resp = await createFolders(data?.claveArchivo);
                    console.log(resp);
                  }}
                >
                 <FolderOpenOutlined style={{ color: '#bdbd18'}} /> 
                </div>
              );
            } else {
              return "No disponible";
            }
          },
        },
      ],
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
            label="Seleccionar una enfermedad"
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
          <Alert {...alert} />

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
          <button type="submit" disabled={loading} className="btn btn-primary">
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
