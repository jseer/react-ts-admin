import { IPagination } from '@/utils/typing';
import axios from '@/utils/axios';
import { ITouristInfo } from './tourist';

export interface ILoginRecordInfo extends ITouristInfo {
  type: 'account' | 'tourist';
}
interface ILoginRecordsPage extends IPagination {
  list: ILoginRecordInfo[];
}
export const getLoginRecords = async (params: any) => {
  return axios.get<ILoginRecordsPage, ILoginRecordsPage>(
    '/api/system/getLoginRecords',
    {
      params,
    }
  );
};
