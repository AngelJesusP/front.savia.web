import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import useTable from "../hooks/useTable";
import { Alert } from "../../../utils/components/Alert";
import type { ColumnsType } from "antd/es/table";
import { UpdateCharge } from "../components/UpdateCharge";
import { padding8 } from "../styles/stylesUploadFile";

export const ConsultCharge = () => {
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
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    hidden: boolean;
  }>({
    message: "",
    type: "error",
    hidden: true,
  });
  const [isUpdateChargeOpen, setIsUpdateChargeOpen] = useState(false);

  const showModal = () => {
    setIsUpdateChargeOpen(true);
  };

  const handleOk = () => {
    setIsUpdateChargeOpen(false);
  };

  const handleCancel = () => {
    setIsUpdateChargeOpen(false);
  };

  const onSubmit = async (values: any) => {};

  const columnas: ColumnsType<any> = [
    {
      title: "Nombre de ubicación",
      align: "center",
      dataIndex: "nombre_ubicación",
    },
    {
      title: "Nombre",
      align: "center",
      dataIndex: "claveArchivo",
    },
    {
      title: "Apellidos",
      align: "center",
      dataIndex: "fechaCargue",
    },
    {
      title: "Tipo de documento",
      dataIndex: "estadoArchivo",
      align: "center",
    },
    {
      title: "Numero documento",
      align: "center",

      dataIndex: "cantidadRegistros",
    },
    {
      title: "Código BDUA",
      align: "center",

      dataIndex: "cantidadRegistros",
    },
    {
      title: "Novedad",
      align: "center",

      dataIndex: "cantidadRegistros",
    },
    {
      title: "Código del prestador o eps que reporta",
      align: "center",

      dataIndex: "cantidadRegistros",
    },
  ];

  return (
    <div className="container-fluid" style={{ marginTop: "20px" }}>
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
              className="w-25"
              showSearch
              placeholder="Selecciona la enfermedad"
              optionFilterProp="children"
              // filterOption={(input, option) =>
              //   (option?.label ?? "")
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
              // options={listEnfermedades}
            />
          </Form.Item>
          <Row>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Tipo de documento"
                  name="tipo_documento"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    className="w-90"
                    showSearch
                    placeholder="Selecciona un tipo de documento"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Numero documento"
                  name="numero_documento"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Novedad"
                  name="novedad"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    // disabled={activeKey === "2"}
                    className="w-90"
                    showSearch
                    placeholder="Selecciona una novedad"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ ...padding8 }}>
                <Form.Item
                  label="Código prestador o eps que reporta"
                  name="cod_eps_reporta"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    // disabled={activeKey === "2"}
                    className="w-90"
                    showSearch
                    placeholder="Selecciona código prestador o eps que reporta"
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={undefined}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
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
        <button
          onClick={showModal}
          style={{ float: "right" }}
          className="btn btn-primary"
        >
          Editar
        </button>
        <Modal
          title="Editar cargue"
          open={isUpdateChargeOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Tooltip
                trigger="hover"
                placement="top"
                color="#ffff"
                title={
                  <>
                    <Tooltip title={"Documento (txt)"}>
                      <Button
                        onClick={() => {
                          handleOk();
                        }}
                      >
                        txt
                      </Button>
                    </Tooltip>
                    <Tooltip title={"Documento (csv)"}>
                      <Button
                        onClick={() => {
                          handleOk();
                        }}
                      >
                        csv
                      </Button>
                    </Tooltip>
                  </>
                }
              >
                <Button>
                  Exportar
                </Button>
              </Tooltip>
            </>,
          ]}
          width={"80%"}
        >
          <UpdateCharge />
        </Modal>

        <Table
          columns={columnas}
          //items={data}
          // with_pagination
          // paginationTop
          loading={loading}
          //count={total}
          // handleTableChange={handleTableChange}
        />
      </Card>
    </div>
  );
};
