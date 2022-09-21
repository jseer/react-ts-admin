import { IPagination } from '@/utils/typing';
import axios from '@/utils/axios';

export interface IMenuInfo {
  id: number;
  code: string;
  name: string;
  path: string;
  parentId: number | null;
  type: '1' | '2';
  children?: IMenuInfo[];
}
export const createMenu = async (data: IMenuInfo) => {
  return axios.post<IMenuInfo, IMenuInfo>('/api/menu/create', data);
};

// export interface IMenuInfo extends IMenuInfo {
//   children: 
// }
export const getMenuList = async (params?: any) => {
  return axios.get<IMenuInfo[], IMenuInfo[]>('/api/menu/list', {
    params,
  });
};

export const getAuthMenuList = async (params?: any) => {
  return axios.get<IMenuInfo[], IMenuInfo[]>('/api/menu/authList', {
    params,
  });
};

export const getMenuListByRoleId = async (id: number) => {
  return axios.get<IMenuInfo[], IMenuInfo[]>('/api/menu/listByRoleId', {
    params: {
      id,
    },
  });
};

export const updateMenu = async (data: IMenuInfo) => {
  return axios.post<boolean, boolean>('/api/menu/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/menu/removeByIds', data);
};
