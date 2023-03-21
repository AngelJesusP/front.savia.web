import { Card, Popover, Tag, TourProps } from "antd";
import moment from "moment";
import { useEffect, FC, useState } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getLogErrors } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import ProgressFile from "./ProgressFile";

import { Input } from 'antd';
const { TextArea } = Input;

// interface ITableGeneric {
//   activeKey: string;
// }

const TableGeneric: FC<any> = () => {
    const constantAlertJson = {
        message: "",
        type: "error",
        hidden: true,
    };

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
            target: null,
        },
        {
            title: "Top",
            description: "On the top of target.",
            target: null,
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
                if (key != 'id') {
                    return {
                        title: `${key.split("_").join(" ")}`,
                        dataIndex: `${key}`,
                        key: `${key}`,
                        fixed: (key === "error_validacion") ? 'right' : null,
                        render: (value: any) => {
                            if (key === "error_validacion") {
                                return (
                                    <>
                                        <Popover overlayStyle={{ width: "20vw" }} content={(
                                            <TextArea className="w-100"
                                                value={"Fila: 1 \nColumna: 2\nVariable: V03FechaNacimiento\nDescripción: La variable V03FechaNacimiento no cumple con el formato establecido"}
                                                disabled={true}
                                                autoCorrect="false" style={{ height: '10vh', color: 'black' }} />
                                        )} title={"Lista de errores"} trigger="click">
                                            <Tag
                                                key={key}
                                                color="red"
                                                style={{
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                }}>
                                                Ver errores
                                            </Tag>
                                        </Popover>
                                    </>
                                );
                            } else return <span>{value}</span>;
                        },
                    };
                } else return {}
            });
            if (columsForJson.length - 1) setColumns(columsForJson);
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
