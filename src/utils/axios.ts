import axios from 'axios';
import { notification } from 'antd';
import { history } from '@/router';

const request = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:7001',
});
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
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
        history.push('/login');
      default:
        notification.error({
          message: `请求: ${config.url}`,
          description: data.message || '出错了',
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
