import { IPagination } from '@/utils/typing';
import { IUserLogin } from '@/store/global';
import { IUserInfo, IUserPage, IUserParams } from '@/store/user';
import axios from '@/utils/axios';
import { ILoginRecordInfo } from './system';

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

export const removeByIds = async (data: { ids: React.Key[] }) => {
  return axios.post('/api/user/removeByIds', data);
};

export const getCurrentUser = async () => {
  return axios.get<IUserInfo | ITouristInfo, IUserInfo | ITouristInfo>('/api/user/getCurrent');
};

export interface ITouristInfo {
  name: string;
  type: 'account' | 'tourist';
}

export const touristLogin = async () => {
  return axios.post<ITouristInfo, ITouristInfo>('/api/user/touristLogin');
}

export interface ILoginHistoryInfo extends Omit<ILoginRecordInfo, 'type'> {
  
}
interface ILoginHistoryPage extends IPagination {
  list: ILoginHistoryInfo[];
}
export const getLoginHistory = async (params: any) => {
  return axios.get<ILoginHistoryPage, ILoginHistoryPage>(
    '/api/user/getLoginHistory',
    {
      params,
    }
  );
};

export const validateByNameOrEmail = async (params: any) => {
  return axios.get<IUserInfo, IUserInfo>(
    '/api/user/validateByNameOrEmail',
    {
      params,
    }
  );
};

interface ICryptoInfo {
  publicKey: string;
}
export const getPublicKey = async () => {
  return axios.get<ICryptoInfo, ICryptoInfo>('/api/common/rsa/public');
};