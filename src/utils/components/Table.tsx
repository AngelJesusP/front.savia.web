import { FC } from 'react';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { Empty } from 'antd';

interface CompressTableProps {
    columns?: ColumnsType<any>;
    items: any[];
    title?: string;
    change_page?: (page: number, pageSize?: number) => void;
    loading?: boolean;
    with_pagination?: boolean;
    count?: number;
    scroll?: any;
    expandable?: any;
}


const getPaginator = (
    total: number,
    change_page?: (page: number, pageSize?: number) => void,
    title?: string
): TablePaginationConfig => {
    return {
        responsive: true,
        pageSizeOptions: [10, 20, 50, 100],
        locale: { items_per_page: '' },
        showLessItems: true,
        position: ['bottomRight', 'topRight'],
        total: total || 0,
        ...(change_page
            ? {
                  onChange: change_page,
                  defaultPageSize: 10,
                  showSizeChanger: true,
              }
            : {}),
        showTotal: (total /*, current*/) => {
            return (
                <div>
                    {title && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '2px',
                                fontSize: '14px',
                            }}
                        >
                            {title}
                        </div>
                    )}

                    <span className="total-results">
                        Total de resultados<span style={{ color: '#F28C02' }}>: {total}</span>
                    </span>
                    <span className="results-text"> Registros por página </span>
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
    scroll,
    expandable,
}) => {
    items = Array.isArray(items) ? items : [];
    const data = items?.map((item, i) => ({ ...item, key: `compress_table_${i}` }));
    const ops = {
        columns: columns,
        dataSource: data,
        pagination: false,
        ...(with_pagination ? { pagination: getPaginator(count ? count : data?.length, change_page, title) } : {}),
        ...(expandable ? expandable : {}),
        loading: loading,
        bordered: true,
        className: 'w-100',
        locale: {
            emptyText: (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                        height: 60,
                        color: 'blue',
                    }}
                    description={
                        <span
                            style={{
                                color: 'rgb(74,74,74)',
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'WorkSans-Regular',
                            }}
                        >
                            No se encontraron datos en la búsqueda
                            <br />
                            <span style={{ fontWeight: '400', fontFamily: 'WorkSans-Regular', fontSize: '14px' }}>
                                Realiza una nueva consulta
                            </span>
                        </span>
                    }
                />
            ),
        },
        ...(scroll ? (typeof scroll === 'boolean' ? { scroll: { x: 'max-content' } } : scroll) : {}),
    };
    return (
        <div>
            <Table {...ops} />
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


