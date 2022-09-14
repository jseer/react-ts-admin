import { IUserLogin } from '@/store/global';
import { IUserInfo, IUserPage, IUserParams } from '@/store/user';
import axios from '@/utils/axios';

export const userCreate = async (data: IUserInfo) => {
  return axios.post<IUserInfo, IUserInfo>('/api/user/create', data);
};

export const userLogin = async (data: IUserLogin) => {
  return axios.post<IUserLogin, IUserInfo>('/api/user/login', data);
};

export const userLogout = async () => {
  return axios.post('/api/user/logout');
};

export const userPage = async (params: IUserParams) => {
  return axios.get<IUserParams, IUserPage>('/api/user/page', {
    params,
  });
};

export const userUpdate = async (data: Omit<IUserInfo, 'password'>) => {
  return axios.post<IUserInfo, IUserInfo>('/api/user/update', data);
};

export const removeByIds = async (data: { ids: React.Key[]}) => {
  return axios.post('/api/user/removeByIds', data);
};

export const getCurrentUser = async () => {
  return axios.get<IUserInfo, IUserInfo>('/api/user/getCurrent');
}