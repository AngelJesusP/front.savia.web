import React from 'react'
import { CONTAINER_BOXSHADOW, CONTAINER_HEIGHT_BACKGROUND, Font_Montserrat } from '../../../utils/css/containerBackground';
import { Input, Select, Tabs, TabsProps } from 'antd';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { SPAN } from '../styles/stylesUploadFile';
import { ColumnsType } from 'antd/es/table';
import { MyState } from '../types/Consulta.type'
import TableConsulta from '../components/TableConsulta';
import { LabelOptional } from '../../../utils/components/Labeloptional';
import { getListEnfermedades } from '../../../utils/api/api';
import { IConsulta, Ienfermedades } from '../interfaces/enfermedades.interfaces';
import { convertListToSelect } from '../../../utils/constants/convertToList';
import { Alert } from '../../../utils/components/Alert';
import { onClickConsultar } from '../service/enfermedades.services';
import TablePatientDetail from '../components/TablePatientDetail';

const { RangePicker } = DatePicker;
const { Option } = Select;
const constantAlertJson = {
    message: "",
    type: "error",
    hidden: true
}
export default class QueryRegister extends React.Component<{}, MyState> {

    setTabInformacionDetalle = async () => {
        this.setState({
            items: this.state.items?.map((item, index) => {
                if (index === 1) {
                    return {
                        ...item,
                        disabled: item.disabled === true
                    }
                }
                return item
            }),
            activeKey: '2',
        });
    };

    returnToConsultation = async () => {
        this.setState({
            items: this.state.items?.map((item, index) => {
                if (index === 1) {
                    return {
                        ...item,
                        disabled: item.disabled === true
                    }
                }
                return item
            }),
            activeKey: '1',
        });
    };


    state: MyState = {
        jsonAlert: constantAlertJson,
        listEnfermedades: [],
        listIps: [],

        columnas: [],
        /* variable de los tab */
        tabTablaConsulta: false,
        tabInformacionDetalle: true,
        tabLogErrores: true,

        /* variable de los campos del formulario */
        idEnfermedad: -1,
        idIps: -1,
        tipoDocumento: null,
        numeroDocumento: null,
        desde: null,
        hasta: null,
        activeKey: '1',
        items: [
            {
                key: '1',
                label: `Consulta de datos cargados`,
                children: (<TableConsulta setTabInformacionDetalle={this.setTabInformacionDetalle} />),
                disabled: false
            },
            {
                key: '2',
                label: `Detalle de una paciente`,
                children: (<TablePatientDetail returnToConsultation={this.returnToConsultation}/>),
                disabled: true
            },
            {
                key: '3',
                label: `Log de errores`,
                children: `tab 3`,
                disabled: true
            },
        ]
    };

    /* Columnas para la tabla de detalle persona */
    columnasDetalle: ColumnsType<any> = [
        { title: 'Id', dataIndex: 'id', width: '5%' },
        { title: 'Telefono', dataIndex: 'telefono' },
        { title: 'Regimen de afilición', dataIndex: 'regimenAfiliacion' },
        { title: 'Municipio de residencia', dataIndex: 'municipioResidencia' },
        { title: 'Fecha de afilicion Eapb', dataIndex: 'fechaAfilicionEapb' },
        { title: 'Código Eapb', dataIndex: 'codigoEapb' },
        { title: 'Causa de muerte', dataIndex: 'causaMuerte' },
        { title: 'Fecha muerte', dataIndex: 'fechaMuerte' },
        { title: 'Fecha de corte', dataIndex: 'fechaCorte' },
        { title: 'Código serial', dataIndex: 'codigoSerial' },
    ]


    componentDidMount = async () => {
        await this.getListEnfermedadesConsulta()
    }


    getListEnfermedadesConsulta = async () => {
        await getListEnfermedades().then(({ data }) => {
            const { status } = data
            if (status && status == 200) {
                const list: Ienfermedades[] = data.data
                const { convert } = convertListToSelect(list)
                this.setState({ listEnfermedades: convert })
            }
        })
    }

    handleChangeConsulta = async () => {
        this.setState({ jsonAlert: constantAlertJson })
        const { idEnfermedad, idIps, tipoDocumento, numeroDocumento, desde, hasta } = this.state
        const data: IConsulta = { idEnfermedad, idIps, tipoDocumento, numeroDocumento, desde, hasta, page: 1, limit: 1 }
        // const { response } = await onClickConsultar(data);
        await onClickConsultar(data);
        // this.setState({ jsonAlert : response })
    }


    render(): React.ReactNode {
        const { listEnfermedades, jsonAlert, activeKey, items } = this.state;

        return (
            <div className='container-upload-file' style={CONTAINER_HEIGHT_BACKGROUND}>
                <div className='card m-4 border-0' style={CONTAINER_BOXSHADOW}>
                    <div className='card-header bg-white'>
                        <span style={Font_Montserrat(true, 13, 12)}>
                            Realziar consulta de registros cargados &#160;
                            <span style={{ color: '#AD0808', ...Font_Montserrat(false, 10, 12) }}>
                                - &#160; Llenar todos los campos que sean obligatorios </span>
                        </span>
                    </div>
                    <div className='card-body'>
                        <div className='row w-100'>
                            <div className="col-3">
                                <span style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>Seleccionar un enfermedad </span>
                                <Select className="w-100"
                                    showSearch
                                    placeholder="Selecciona la enfermedad"
                                    optionFilterProp="children"
                                    onChange={(e: any) => this.setState({ idEnfermedad: e.target.value })}
                                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={listEnfermedades}
                                />
                            </div>
                            <div className="col-3">
                                <span style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>Seleccionar la IPS</span>
                                <Select className="w-100"
                                    showSearch
                                    placeholder="Selecciona la IPS"
                                    optionFilterProp="children"
                                    onChange={(e: any) => this.setState({ idIps: e.target.value })}
                                    // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[]}
                                />
                            </div>
                            <div className="col-3">
                                <span className='w-100' style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>Número de documento <LabelOptional /></span>
                                <Input.Group compact>
                                    <Select style={{ width: '30%' }}
                                        onChange={(e: any) => this.setState({ tipoDocumento: e.target.value })}
                                        placeholder="C.C">
                                        <Option value="CC">CC</Option>
                                    </Select>
                                    <Input style={{ width: '70%' }}
                                        onChange={(e: any) => this.setState({ numeroDocumento: e.target.value })}
                                        placeholder='Numero de documento' />

                                </Input.Group>
                            </div>
                            <div className="col-3">
                                <span className='w-100' style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>Desde - Hasta <LabelOptional /> </span>
                                <Space direction="vertical" size={12}>
                                    <RangePicker locale={locale}
                                        onChange={(e: any) => console.log(e)}
                                        placeholder={["Fecha inicial", "Fecha final"]} />
                                </Space>
                            </div>
                        </div>
                        <Alert {...jsonAlert} />
                        <hr />
                        <button type="submit"
                            style={{
                                ...Font_Montserrat(true, 13, 18), borderRadius: 18, width: '10%',
                                border: '1px solid #244c5c', backgroundColor: 'white', padding: 7, marginRight: 14
                            }}
                            className='btn text-dark'>
                            Limpiar
                        </button>
                        <button type="submit"
                            onClick={() => this.handleChangeConsulta()}
                            style={{
                                ...Font_Montserrat(true, 13, 18),
                                borderRadius: 18, width: '10%', backgroundColor: '#244c5c', padding: 7
                            }}
                            className='btn text-white'>
                            Consultar
                        </button>
                    </div>
                </div>

                <div className='card m-4 border-0' style={CONTAINER_BOXSHADOW}>
                    <div className='card-body'>
                        <Tabs onChange={(key: string) => {
                            this.setState({ activeKey: key });
                        }} activeKey={activeKey} items={items} />
                    </div>
                </div>
            </div >
        );
    }
}