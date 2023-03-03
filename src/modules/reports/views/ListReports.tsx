import { Card } from "antd"
import { FilePdfOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Collapse } from 'antd'
import { useState } from "react";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { deleteFolderOrFile } from "../service/reports.service";

export const ListReports = () => {
    const { Panel } = Collapse;
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start');

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const genExtra = () => (
        <div>
            <UploadOutlined className="me-2" />
            <EditOutlined className="me-2 text-info" />
            <DeleteOutlined className="text-danger" />
        </div>
    );

    const editReport = (id: number) => {
        alert(id)
    }

    const deleteReport = async (id: number) => {
        await deleteFolderOrFile 
    }

    return (
        <>
            <Card title='filtros' className="mt-3">

            </Card>

            <Card title='Reportes' className="mt-3">
                <Collapse
                    defaultActiveKey={['1']}
                    onChange={onChange}
                    expandIconPosition={expandIconPosition}
                >
                    <Panel header="Carpeta 1" key="1" extra={genExtra()}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <FilePdfOutlined className="me-2" />
                                <span>Nombre del pdf</span>
                            </div>
                            <div>
                                <DeleteOutlined className="text-danger" onClick={() => deleteReport(1)} />
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Carpeta 2" key="2" extra={genExtra()}>
                        <div>{''}</div>
                    </Panel>
                    <Panel header="Carpeta 3" key="3" extra={genExtra()}>
                        <div>{''}</div>
                    </Panel>
                </Collapse>
            </Card>
        </>
    )
}
