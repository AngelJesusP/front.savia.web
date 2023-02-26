import { FC } from "react";
import Table, { TablePaginationConfig } from "antd/lib/table";
import { Empty, Select } from "antd";
import "../../utils/Css/tableGeneric.scss";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

interface CompressTableProps {
  columns: any;
  items: any[];
  title?: string;
  change_page?: (page: number, pageSize?: number) => void;
  handleTableChange?: ((pagination: TablePaginationConfig, filters: Record<string, string | number | boolean | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void);
  loading?: boolean;
  with_pagination?: boolean;
  paginationTop?: boolean;
  count?: number;
  scroll?: any;
  expandable?: any;
}

// Pagination Table
const getPaginator = (
  total: number,
  paginationTop: boolean,
  change_page?: (page: number, pageSize?: number) => void,
  title?: string
): TablePaginationConfig => {
  return {
    responsive: true,
    pageSizeOptions: [10, 20, 50, 100],
    locale: { items_per_page: "" },
    showLessItems: true,
    position: paginationTop ? ["bottomRight", "topRight"] : ["bottomRight"],
    total: total || 0,
    selectComponentClass: (props: any) => {
      return (
        <Select
          defaultValue="10"
          value={props.value}
          onChange={(e: any) => props.onChange(e)}
          options={props.children?.map((option: any) => {
            return {
              value: option.props.value,
              label: option.props.value,
            };
          })}
        />
      );
    },

    ...(change_page
      ? {
          onChange: change_page,
          defaultPageSize: 10,
          showSizeChanger: true,
        }
      : {}),
    showTotal: (total) => {
      return (
        <div>
          {title && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "2px",
                fontSize: "14px",
              }}
            >
              {title}
            </div>
          )}

          <span className="total-results">
            Total <span style={{ color: "#F28C02" }}>: {total}</span>
          </span>
          <span className="results-text ms-5"> Registros por página </span>
        </div>
      );
    },
  };
};

const CompressTable: FC<CompressTableProps> = ({
  count,
  title,
  columns,
  items,
  change_page,
  loading,
  with_pagination,
  paginationTop,
  scroll,
  expandable,
  handleTableChange,
}) => {
  items = Array.isArray(items) ? items : [];
  const data = items?.map((item, i) => ({
    ...item,
    key: `compress_table_${i}`,
  }));
  const ops = {
    columns: columns,
    dataSource: data,
    pagination: false,
    ...(with_pagination
      ? {
          pagination: getPaginator(
            count ? count : data?.length,
            paginationTop || false,
            change_page,
            title
          ),
        }
      : {}),
    ...(expandable ? expandable : {}),
    loading: loading,
    bordered: true,
    className: "w-100",
    locale: {
      emptyText: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
            color: "blue",
          }}
          description={
            <span style={{ color: "#000000" }}>
              No hay datos para mostrar.
              <br />
            </span>
          }
        />
      ),
    },
    ...(scroll
      ? typeof scroll === "boolean"
        ? { scroll: { x: "max-content" } }
        : scroll
      : {}),
  };
  
  return (
    <div>
      <Table
        {...ops}
        onChange={handleTableChange}
      />
    </div>
  );
};

CompressTable.defaultProps = {
  items: [],
  change_page: () => {},
  loading: false,
  with_pagination: true,
  scroll: true,
};

export default CompressTable;
