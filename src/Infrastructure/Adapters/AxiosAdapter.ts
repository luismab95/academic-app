import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {API_URL} from '@env';
import {authStore, decryptedData, encryptedData} from '../../Shared';
import {StorageAdapter} from './StorageAdapter';
import {AuthSession} from '../../Domian';

const apiURL = API_URL;

const axiosApi = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(async config => {
  if (
    !config.url?.includes('/device') &&
    !config.url?.includes('/public-key')
  ) {
    const publickeyServer = await StorageAdapter.getItem('publicKey-server');

    if (config.data !== undefined)
      config.data = {data: await encryptedData(config.data, publickeyServer!)};
  }
  const session = await StorageAdapter.getItem('session');
  const deviceId = await DeviceInfo.getUniqueId();
  config.headers['x-device-serie'] = deviceId;
  if (session !== null) {
    const {accessToken} = JSON.parse(session) as AuthSession;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosApi.interceptors.response.use(
  async response => {
    if (
      !response.config.url?.includes('/device') &&
      !response.config.url?.includes('/public-key')
    ) {
      const decrypt = await decryptedData(response.data.data);
      response.data = {...response.data, data: decrypt};
    }

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
    return Promise.reject(
      new Error(error.response?.data?.message || error.message),
    );
  },
);

export {axiosApi};
