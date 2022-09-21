import axios from '@/utils/axios';
import { IPagination } from '@/utils/typing';

export interface ITouristInfo {
  name: string;
  ip: string;
  country: string;
  province: string;
  city: string;
}

export const touristLogin = async () => {
  return axios.post<ITouristInfo, ITouristInfo>('/api/tourist/login');
}

export interface ITouristPage extends IPagination {
  list: ITouristInfo[];
}
export const getTouristPage = async (params: any) => {
  return axios.get<ITouristPage, ITouristPage>('/api/tourist/page', {
    params,
  });
}