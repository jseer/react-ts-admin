import { IRolePage, IRoleInfo } from '@/store/role';
import axios from '@/utils/axios';

export const createRole = async (data: IRoleInfo) => {
  return axios.post<IRoleInfo, IRoleInfo>('/api/role/create', data);
};

export const rolePage = async (params: IRolePage) => {
  return axios.get<IRolePage, IRolePage>('/api/role/page', {
    params,
  });
};

export const getRoleList = async (params?: any) => {
  return axios.get<IRoleInfo[], IRoleInfo[]>('/api/role/list', {
    params,
  });
};

export const updateRole = async (data: IRoleInfo) => {
  return axios.post<boolean, boolean>('/api/role/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/role/removeByIds', data);
};
