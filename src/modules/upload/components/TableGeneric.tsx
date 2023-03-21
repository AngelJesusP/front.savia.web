import { Card, Tag, Tour, TourProps } from "antd";
import moment from "moment";
import { useEffect, FC, useState, useRef } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getLogErrors } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import ProgressFile from "./ProgressFile";

// interface ITableGeneric {
//   activeKey: string;
// }

const TableGeneric: FC<any> = () => {
  const constantAlertJson = {
    message: "",
    type: "error",
    hidden: true,
  };

  const ref = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Center",
      description: "Displlayed in the center of screen.",
      target: null,
    },
    {
      title: "Right",
      description: "On the right of target.",
      placement: "right",
      target: () => ref.current,
    },
    {
      title: "Top",
      description: "On the top of target.",
      placement: "top",
      target: () => ref.current,
    },
  ];

  const [colums, setColumns] = useState();
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
  const [getskeleton, setSkeleton] = useState<boolean>(false);
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

  const getDescriptionError = () => {
    setSkeleton(true);
    // setTimeout(() => {
    //   setSkeleton(false);
    //   setClickPopover('');
    // }, 3000);
  };

  useEffect(() => {
    if (data.length > 0) {
      const columsForJson: any = Object.keys(data[0]).map((key) => {
        return {
          title: `${key.split("_").join(" ")}`,
          dataIndex: `${key}`,
          key: `${key}`,
          render: (value: any) => {
            if (key === "error_validacion") {
              return (
                <>
                  <Tag
                    ref={ref}
                    onClick={() => {setOpen(true)}}
                    color="red"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Ver errores
                  </Tag>
                  <Tour
                    open={open}
                    onClose={() => {setOpen(false)}}
                    steps={steps}
                  />
                </>
              );
            } else {
              return <span>{value}</span>;
            }
          },
        };
      });
      if (columsForJson.length) setColumns(columsForJson);
    } else {
      setColumns(undefined);
    }
  }, [data]);

  const change_page = async (page: number, pageSize?: number) => {
    await getData({
      ...filters,
      page,
      limit: pageSize,
    });
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

    const { data } = await getLogErrors(dataFinal);
    valuesResponse = data;
    setData(valuesResponse?.data || []);
    setFilters(dataFinal);
    setJsonAlert({ ...jsonAlert, message: valuesResponse?.message || "" });
    setTotal(Number(valuesResponse?.items?.replace(/[\[\]]/g, "")) || null);
    setLoading(false);
  };

  const onClear = () => {
    setLoading(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setData([]);
  };

  return (
    <div className="container-fluid">
      <FormFilters
        onClear={onClear}
        jsonAlert={jsonAlert}
        loading={loading}
        onSubmit={getData}
        type="error"
      />
      <Card className="mt-3">
        <Table
          items={data}
          columns={colums}
          with_pagination
          paginationTop
          count={total ? total : 0}
          loading={loading}
          change_page={change_page}
        />
        <div className="d-flex justify-content-end ">
          <ProgressFile filters={{ ...filters, bandera: false }} />
        </div>
      </Card>
    </div>
  );
};

export default TableGeneric;
