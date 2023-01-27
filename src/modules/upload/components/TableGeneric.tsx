import Table from "../../../utils/components/Table";
import dataJson from "./data.json";

const TableGeneric = () => {
 
    const columsForJson = Object.keys(dataJson[0]).map((key) => {
      return {
        title: `${key.split('_').join(' ')}`,
        dataIndex: `${key}`,
        key: `${key}`,
      };
    });


  return <Table items={dataJson} columns={columsForJson} />;
};

export default TableGeneric;
