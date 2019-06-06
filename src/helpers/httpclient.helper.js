import axios from 'axios'
import appConfig from '../config'


const HttpClient = axios.create({
  baseURL: appConfig.API_END_POINT,
  timeout: 60000
});

HttpClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
export default HttpClient;
