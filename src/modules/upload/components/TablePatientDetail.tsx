import { FC, useEffect, useState } from "react";

import { Font_Montserrat } from "../../../utils/css/containerBackground";
import { getPaciente } from "../service/enfermedades.services";
import { SPAN } from "../styles/stylesUploadFile";

interface PatientDetailPros {
  returnToConsultation: any;
  idPaciente: number | null;
}

const TablePatientDetail: FC<PatientDetailPros> = ({
  returnToConsultation,
  idPaciente,
}) => {
  const [paciente, setPaciente] = useState<any>(null);

  useEffect(() => {
    setPaciente(null)
    if (idPaciente) get_paciente(idPaciente);
  }, [idPaciente]);

  const get_paciente = async (id_paciente: number) => {
    const _paciente = await getPaciente(id_paciente);
    setPaciente(_paciente?.item || null);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <span style={{ ...Font_Montserrat(true, 12, 15), ...SPAN }}>
          Detalles del paciente
        </span>

        <div
          onClick={() => returnToConsultation('1')}
          
          className="btn btn-outline-primary "
        >
          Volver
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end ">
                <span style={{ fontWeight: "bold" }}>
                  Regimen de filiación:
                </span>
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col"> {paciente?.regimenAfiliacion || ''} </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-1 text-center ">
          <span style={{ fontWeight: "bold" }}>:</span>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end">
                <span style={{ fontWeight: "bold" }}>
                  Municipio de residencia:
                </span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col">{paciente?.municipioResidencia || ''} </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end">
                <span style={{ fontWeight: "bold" }}>Telefono:</span>
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col"> {paciente?.telefono || ''} </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-1 text-center ">
          <span style={{ fontWeight: "bold" }}>:</span>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end ">
                <span style={{ fontWeight: "bold" }}>Código eapb:</span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col">{paciente?.codigoEapb || ''} </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end">
                <span style={{ fontWeight: "bold" }}>
                  Fecha de afilicion eapb:
                </span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col"> {paciente?.fechaAfilicionEapb || ''} </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-1 text-center ">
          <span style={{ fontWeight: "bold" }}>:</span>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end ">
                <span style={{ fontWeight: "bold" }}>Fecha de muerte:</span>
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col">{paciente?.fechaMuerte || ''} </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end">
                <span style={{ fontWeight: "bold" }}>Causa de muerte:</span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col"> {paciente?.causaMuerte || ''} </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-1 text-center ">
          <span style={{ fontWeight: "bold" }}>:</span>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end ">
                <span style={{ fontWeight: "bold" }}>Fecha de corte:</span>
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col">{paciente?.fechaCorte || ''} </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end">
                <span style={{ fontWeight: "bold" }}>Causa de muerte:</span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col"> {paciente?.causaMuerte || ''} </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-1 text-center ">
          <span style={{ fontWeight: "bold" }}>:</span>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="col text-end ">
                <span style={{ fontWeight: "bold" }}>Código serial:</span>{" "}
              </div>
              <hr />
            </div>
            <div className="col">
              <div className="col">{paciente?.codigoSerial || ''} </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePatientDetail;
