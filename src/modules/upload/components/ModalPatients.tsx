import { Card, Modal } from "antd";
import { useState } from "react";
import FormFilters from "./FormFilters";
import TableConsulta from "./TableConsulta";

const ModalPatients = () => {
  const [isVisible, setIsVisible] = useState(false);
  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        className="text-primary"
        onClick={open}
      >
        Ver detalle
      </span>
      <Modal
        className="modal-patients"
        open={isVisible}
        onCancel={close}
        width={1200}
        bodyStyle={{ padding: 0 }}
      >
        <FormFilters
          onSubmit={() => {}}
          onClear={() => {}}
          jsonAlert={""}
          loading
        />

        <Card className="mt-3">
          <TableConsulta />
        </Card>
      </Modal>
    </>
  );
};

export default ModalPatients;
