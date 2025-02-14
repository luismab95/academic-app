import axios from 'axios';
import {API_URL} from '@env';
import {StorageAdapter} from './storage';
import {AuthSession} from '../../domian/entittes/auth';

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(async config => {
  const session = await StorageAdapter.getItem('session');
  if (session !== null) {
    const {accessToken} = JSON.parse(session) as AuthSession;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export {axiosApi};
