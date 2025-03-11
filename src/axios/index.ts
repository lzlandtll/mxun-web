import axios, {RawAxiosRequestHeaders} from 'axios';
import { CONTENT_TYPE } from '@/constants'
import {userStoreHandler} from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const userStore = userStoreHandler()

// 创建一个简单的axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:7000', // 根据实际情况修改为你的API基础URL
  timeout: 5000, // 请求超时时间，可根据需要调整
});

// 定义请求配置接口
interface AxiosConfig {
  url: string;
  method?: string; // 默认是'get'
  params?: any;
  data?: any;
  headers?: RawAxiosRequestHeaders;
  responseType?: 'json' | 'blob' | 'arraybuffer'; // 可根据需要添加更多类型
}

/**
 * 发起HTTP请求
 * @param option - 请求的配置
 */
const request = (option: AxiosConfig) => {
  const { url, method = 'get', params, data, headers, responseType = 'json' } = option;
  return service.request({
    url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      ...headers
    }
  });
};

// 请求拦截器：在请求发送之前执行的逻辑
service.interceptors.request.use(
    (config) => {
      console.log('url: ', config['url'])
      console.log('token: ', userStore.getToken)
      let url = config['url'] || ""
      if(url.startsWith('/open')){
        return config;
      }
      if(userStore.getToken){
        config['headers']['Authorization'] = `Bearer ${userStore.getToken}`;
        return config;
      }
      ElMessage({
        message: '请先进行登录...',
        type: 'warning',
      })
      return Promise.reject();
    },
    (error) => {
      return Promise.reject(error);
    }
);
// 响应拦截器：在响应返回之后执行的逻辑
service.interceptors.response.use(
    (response) => {
        if(response && response['status'] == 200 && response['data']['code'] == "200"){
            // 这里是正确响应的
            return response;
        }
        ElMessage({
            message: response['data']['info'],
            type: 'warning',
        })
        return response;
    },
    (error) => {
      // 在响应返回之后可以添加一些逻辑，例如处理错误响应
      return Promise.reject(error);
    }
);
/**
 * 导出的方法，用于发起不同类型的HTTP请求
 */
export default {
  get: <T = any>(option: AxiosConfig) => request({ method: 'get', ...option }) as Promise<T>,
  post: <T = any>(option: AxiosConfig) => request({ method: 'post', ...option }) as Promise<T>,
  put: <T = any>(option: AxiosConfig) => request({ method: 'put', ...option }) as Promise<T>,
  delete: <T = any>(option: AxiosConfig) => request({ method: 'delete', ...option }) as Promise<T>,
};
