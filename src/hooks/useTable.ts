import { initPageInfo } from '@/utils/common';
import { useState } from 'react';

const useTable = <T>() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({...initPageInfo});
  const [total, setTotal] = useState(0);
  return {
    selectedRowKeys,
    list,
    loading,
    pageInfo,
    total,
    setSelectedRowKeys,
    setList,
    setLoading,
    setPageInfo,
    setTotal,
  }
}

export default useTable;