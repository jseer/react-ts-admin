import { IPagination } from '@/utils/typing';
import axios from '@/utils/axios';

export interface IMenuInfo {
  id?: number;
  code: string;
  name: string;
  path: string;
  parentId: number | null;
  type: '1' | '2';
}
export const createMenu = async (data: IMenuInfo) => {
  return axios.post<IMenuInfo, IMenuInfo>('/api/menu/create', data);
};

// export interface IMenuListItem extends IMenuInfo {
//   children: 
// }
export type IMenuListItem = (IMenuInfo & { children: IMenuListItem[]});
export const getMenuList = async (params?: any) => {
  return axios.get<IMenuListItem[], IMenuListItem[]>('/api/menu/list', {
    params,
  });
};

export const updateMenu = async (data: IMenuInfo) => {
  return axios.post<boolean, boolean>('/api/menu/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/menu/removeByIds', data);
};
