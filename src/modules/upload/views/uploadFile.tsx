import { Tabs, TabsProps } from "antd";
import { useState } from "react";

import TablePatientDetail from "../components/TablePatientDetail";
import TableGeneric from "../components/TableGeneric";
import TableHistorical from "../components/TableHistorical";

const UploadFile = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [idPaciente, setIdPaciente] = useState<number | null>(null);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Histórico`,
      children: (
        <TableHistorical />
      ),
      disabled: false,
    },
    // {
    //   key: "2",
    //   label: `Detalle de un paciente`,
    //   children: (
    //     <TablePatientDetail
    //       returnToConsultation={setActiveKey}
    //       idPaciente={idPaciente}
    //     />
    //   ),
    //   disabled: true,
    // },
    {
      key: "3",
      label: `Log de errores`,
      children: <TableGeneric activeKey={activeKey} />,
    },
  ];

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill">
        <div className="d-flex flex-column h-100" style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)'}}>
          <div className="bg-white d-flex flex-row pt-3 ps-4">
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Consultar datos
            </span>
          </div>
          <div className="challenge-tabs">
            <Tabs
              onChange={(key: string) => {
                setActiveKey(key);
              }}
              activeKey={activeKey}
              items={items}
              tabBarStyle={{ backgroundColor: "#FFF", paddingLeft: "25px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
