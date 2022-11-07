import { IPagination } from '@/utils/typing';
import axios from '@/utils/axios';
import { ITouristInfo } from './tourist';

export interface ILoginRecordInfo extends ITouristInfo {
  type: 'account' | 'tourist';
  loginTime: string;
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

export const getContinuousLoginDays = async () => {
  return axios.get<number, number>(
    '/api/system/continuousLoginDays',
  );
};

export interface ICountMap {
  newUser: number;
  tourist: number;
  login: number;
  userTotal: number;
}

export type ICountType = 'today' | 'week' | 'month';
export const getCountMap = async (type: ICountType) => {
  return axios.get<ICountMap, ICountMap>(
    '/api/system/getCountMap',
    {
      params: { type }
    }
  );
};

export const initData = async () => {
  return axios.post(
    '/api/system/initData',
  );
};