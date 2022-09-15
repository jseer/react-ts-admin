import { initPageInfo } from '@/utils/common';
import { Table as ATable, TableColumnProps } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

interface ITableProps<T> {
  loading: boolean;
  list: T[];
  columns: TableColumnProps<T>[];
  setPageInfo: Dispatch<SetStateAction<typeof initPageInfo>>;
  total: number;
  pageInfo: typeof initPageInfo;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
}

class Table<T extends object> extends React.Component<ITableProps<T>> {
  render() {
    const {
      loading,
      list,
      columns,
      setPageInfo,
      pageInfo,
      total,
      selectedRowKeys,
      setSelectedRowKeys,
    } = this.props;
    return (
      <ATable
        loading={loading}
        dataSource={list}
        columns={columns}
        onChange={(pagination) => {
          setPageInfo({
            current: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
          });
        }}
        pagination={{
          pageSize: pageInfo.pageSize,
          current: pageInfo.current,
          total,
        }}
        rowKey='id'
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
    );
  }
}

export default Table;
