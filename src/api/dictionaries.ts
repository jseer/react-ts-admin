import { IPagination } from '@/utils/typing';
import axios from '@/utils/axios';

export interface IDictionariesInfo {
  id?: number;
  code: string;
  name: string;
  path: string;
  parentId: number;
  type: any;
  children?: IDictionariesInfo[];
}
export const createDictionaries = async (data: IDictionariesInfo) => {
  return axios.post<IDictionariesInfo, IDictionariesInfo>('/api/dictionaries/create', data);
};

export interface IDictionariesPage extends IPagination {
  list: IDictionariesInfo[]
}
export const dictionariesPage = async (params: any) => {
  return axios.get<IDictionariesPage, IDictionariesPage>('/api/dictionaries/page', {
    params,
  });
};

export const updateDictionaries = async (data: IDictionariesInfo) => {
  return axios.post<boolean, boolean>('/api/dictionaries/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/dictionaries/removeByIds', data);
};

export interface IDictionariesItem {
  id?: number;
  label: string;
  value: string | number;
  type: '1' | '2';
}
export const updateDictionariesItems = async (id: number, data: IDictionariesItem[]) => {
  return axios.post<boolean, boolean>('/api/dictionaries/updateDictionariesItems', {
    id,
    list: data,
  });
};

export const getDictionariesItemsById = async (id: number) => {
  return axios.get<IDictionariesItem[], IDictionariesItem[]>('/api/dictionaries/getDictionariesItemsById', {
    params: {
      id,
    }
  });
}

export interface IAllDictionaries {
  [key: string]: IDictionariesItem[];
}
export const getAllDictionaries = async () => {
  return axios.get<IAllDictionaries, IAllDictionaries>('/api/dictionaries/getAllDictionaries');
}