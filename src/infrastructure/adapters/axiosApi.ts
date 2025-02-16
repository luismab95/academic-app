import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {API_URL} from '@env';
import {StorageAdapter} from './storage';
import {AuthSession} from '../../domian/entittes/auth';
import {authStore} from '../../shared';

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(async config => {
  const session = await StorageAdapter.getItem('session');
  const deviceId = await DeviceInfo.getUniqueId();
  if (session !== null) {
    const {accessToken} = JSON.parse(session) as AuthSession;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['x-device-serie'] = `${deviceId}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  async response => {
    const accessToken = response.headers['refresh_token'] as string;
    if (accessToken) {
      const {refreshToken, sessionId, login} = authStore.getState();
      await login!({
        sessionId,
        accessToken,
        refreshToken,
      });
    }
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      const {logout} = authStore.getState();
      await logout!();
    }
    return Promise.reject(error);
  },
);

export {axiosApi};
