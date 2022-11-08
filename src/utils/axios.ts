import { globalActions } from '@/store/global';
import { getItem } from 'src/utils/common';
import axios from 'axios';
import { notification } from 'antd';
import { history } from '@/router';
import store from '@/store';

const request = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7001'
      : process.env.BASE_URL,
});
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data, config } = response;
    switch (data?.code) {
      case 200:
        return data.data;
      case 401:
        store.dispatch(globalActions.setUserInfo(null));
        history.push('/login');
      default:
        notification.error({
          message: data.message || '出错了',
          // message: `请求: ${config.url}`,
          // description: data.message || '出错了',
        });
        break;
    }
    return Promise.reject(data);
  },
  function (error) {
    // 对响应错误做点什么
    const { response, config } = error;
    switch (response.status) {
      default:
        notification.error({
          message: `请求${response.status || ''}: ${config.url}`,
          description: response.statusText || '服务器出错了',
        });
        break;
    }
    return Promise.reject(error);
  }
);

export default request;
