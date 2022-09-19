import axios from '@/utils/axios';

export interface IApiItemInfo {
  id?: number;
  code: string;
  name: string;
  path: string;
  parentId: number | null;
  type: '1' | '2';
}
export const createApiItem = async (data: IApiItemInfo) => {
  return axios.post<IApiItemInfo, IApiItemInfo>('/api/apiItem/create', data);
};

// export interface IMenuListItem extends IApiItemInfo {
//   children: 
// }
export type IApiItemListItem = (IApiItemInfo & { children: IApiItemListItem[]});
export const getApiItemList = async (params?: any) => {
  return axios.get<IApiItemListItem[], IApiItemListItem[]>('/api/apiItem/list', {
    params,
  });
};

export const getApiItemListByRoleId = async (id: number) => {
  return axios.get<IApiItemListItem[], IApiItemListItem[]>('/api/apiItem/listByRoleId', {
    params: {
      id,
    },
  });
};

export const updateApiItem = async (data: IApiItemInfo) => {
  return axios.post<boolean, boolean>('/api/apiItem/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/apiItem/removeByIds', data);
};
