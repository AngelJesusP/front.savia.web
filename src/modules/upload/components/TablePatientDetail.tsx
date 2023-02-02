import { FC } from 'react'
import { Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IDetailPatient } from '../interfaces/enfermedades.interfaces';
import { Font_Montserrat } from '../../../utils/css/containerBackground';
import { SPAN } from '../styles/stylesUploadFile';

interface PatientDetailPros {
    returnToConsultation: any;
}

const TablePatientDetail: FC<PatientDetailPros> = ({ returnToConsultation }) => {

    const data: IDetailPatient =
    {
        id: 1,
        regimen_afiliacion: 'Sub',
        municipio_residencia: 'Magdalena',
        telefono: 300123456,
        codigo_eapb: 1,
        fecha_afilicion_eapb: '2000-01-31',
        fecha_muerte: '2021-01-31',
        causa_muerte: 'accidente',
        fecha_corte: '2021-01-31',
        codigo_serial: 123,
    }
 
    return (
        <div>
            <div>
                <span style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>Detalles del paciente</span>

                <button type="submit"
                    onClick={() => returnToConsultation()}
                    style={{
                        ...Font_Montserrat(true, 13, 18), borderRadius: 18, width: '10%',
                        border: '1px solid #244c5c', backgroundColor: 'white', padding: 7, marginRight: 14
                    }}
                    className='btn text-dark mx-4'>
                    Volver
                </button>
                <hr />
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end "><span style={{ fontWeight: 'bold' }}>Regimen de filiación:</span></div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className='col'> {data.regimen_afiliacion} </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='col-1 text-center '><span style={{ fontWeight: 'bold' }}>:</span></div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end"><span style={{ fontWeight: 'bold' }}>Municipio de residencia:</span> </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className="col">{data.municipio_residencia} </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end"><span style={{ fontWeight: 'bold' }}>Telefono:</span></div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className='col'> {data.telefono} </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='col-1 text-center '><span style={{ fontWeight: 'bold' }}>:</span></div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end "><span style={{ fontWeight: 'bold' }}>Código eapb:</span> </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className="col">{data.codigo_eapb} </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end"><span style={{ fontWeight: 'bold' }}>Fecha de afilicion eapb:</span> </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className='col'> {data.fecha_afilicion_eapb} </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='col-1 text-center '><span style={{ fontWeight: 'bold' }}>:</span></div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end "><span style={{ fontWeight: 'bold' }}>Fecha de muerte:</span></div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className="col">{data.fecha_muerte} </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end"><span style={{ fontWeight: 'bold' }}>Causa de muerte:</span>  </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className='col'> {data.causa_muerte} </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='col-1 text-center '><span style={{ fontWeight: 'bold' }}>:</span></div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end "><span style={{ fontWeight: 'bold' }}>Fecha de corte:</span></div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className="col">{data.fecha_corte} </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end"><span style={{ fontWeight: 'bold' }}>Causa de muerte:</span>  </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className='col'> {data.causa_muerte} </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='col-1 text-center '><span style={{ fontWeight: 'bold' }}>:</span></div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="col text-end "><span style={{ fontWeight: 'bold' }}>Código serial:</span> </div>
                            <hr />
                        </div>
                        <div className="col">
                            <div className="col">{data.codigo_serial} </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TablePatientDetail
