import { IUserLogin } from '@/store/global';
import { IUserInfo } from '@/store/user';
import axios from '@/utils/axios';

export const userLogin = async (data: IUserLogin) => {
  return axios.post<IUserLogin, IUserInfo>('/api/user/login', data);
}
