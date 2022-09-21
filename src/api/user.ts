import { IUserLogin } from '@/store/global';
import { IUserInfo, IUserPage, IUserParams } from '@/store/user';
import axios from '@/utils/axios';

export const userCreate = async (data: IUserInfo) => {
  return axios.post<IUserInfo, IUserInfo>('/api/user/create', data);
};

export const userRegister = async (data: IUserInfo) => {
  return axios.post<IUserInfo, IUserInfo>('/api/user/register', data);
};


export const userLogin = async (data: IUserLogin) => {
  return axios.post<IUserLogin, IUserInfo>('/api/user/login', data);
};

export const userLogout = async () => {
  return axios.post('/api/user/logout');
};

export const userPage = async (params: IUserParams) => {
  return axios.get<IUserPage, IUserPage>('/api/user/page', {
    params,
  });
};

export const getUserListByRoleId = async (id: number) => {
  return axios.get<IUserInfo[], IUserInfo[]>('/api/user/getListByRoleId', {
    params: {
      id,
    },
  });
};

export const getUserList = async () => {
  return axios.get<IUserInfo[], IUserInfo[]>('/api/user/list');
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

interface ITouristInfo {
  name: string;
  ip: string;
  country: string;
  province: string;
  city: string;
}
export const touristLogin = async () => {
  return axios.post<ITouristInfo, ITouristInfo>('/api/tourist/login');
}