import Table from "../../../utils/components/Table";
import dataJson from "./data.json";
import ProgressFile from "./ProgressFile";

const TableGeneric = () => {
  const columsForJson = Object.keys(dataJson[0]).map((key) => {
    return {
      title: `${key.split("_").join(" ")}`,
      dataIndex: `${key}`,
      key: `${key}`,
    };
  });

  return (
    <>
      <Table items={dataJson} columns={columsForJson} />
      <div className="d-flex justify-content-end ">
        <ProgressFile />
      </div>
    </>
  );
};

export default TableGeneric;
