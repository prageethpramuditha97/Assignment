/***
Manage all axios requests
***/
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

//This server is my peronal sever deployed on heroku
const API_BASE_URL = 'https://officemanagement-01725a3093a3.herokuapp.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};
