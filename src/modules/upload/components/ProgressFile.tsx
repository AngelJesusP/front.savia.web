import { Progress } from "antd";
import { CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Font_Montserrat } from "../../../utils/css/containerBackground";

const ProgressFile = () => {
  const [is_visible, setIs_visible] = useState(false);

  return (
    <>
      <button
        style={{
          borderRadius: 18,
          backgroundColor: "#244c5c",
          ...Font_Montserrat(true, 13, 18),
          padding: "8px 20px",
        }}
        className="btn btn-primary text-white mt-3 d-flex align-items-center"
        onClick={() => {
          setIs_visible(true);
        }}
      >
        <DownloadOutlined className="me-2" />
        Exportar datos
      </button>
      {is_visible && (
        <div className="container-progress">
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              top: "5px",
              position: "absolute",
              right: "15px",
              color: "#f0f2f5",
            }}
          >
            <CloseCircleOutlined
              onClick={() => {
                setIs_visible(false);
              }}
            />
          </span>
          <Progress
            type="dashboard"
            percent={75}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
          />
          <span className="text-white">Cargando...</span>
        </div>
      )}
    </>
  );
};

export default ProgressFile;
