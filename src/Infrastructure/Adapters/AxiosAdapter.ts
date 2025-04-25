import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {API_URL} from '@env';
import {
  authStore,
  decryptedData,
  encryptedData,
  errorStore,
  servicesContainer,
  validHash,
} from '../../Shared';
import {StorageAdapter} from './StorageAdapter';
import {AuthSession} from '../../Domian';

let originalPayload = {};
const apiURL = API_URL;

console.info('API_URL', apiURL);

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
    originalPayload = config.data;
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
      originalPayload = {};
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
    console.log('Error en la respuesta de Axios:', error.config);

    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const {logout} = authStore.getState();
      await logout!();
    }

    if (error.response && error.response.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await servicesContainer.auth.getPublicKey();

          if (response === null) {
            await StorageAdapter.removeItem('publicKey-server');
            throw new Error('No se pudo obtener la llave pública');
          }

          if (!validHash(response.data.publicKey, response.data.sha256Hash)) {
            errorStore.setState({
              message: 'No se pudo verificar la llave pública',
            });
            throw new Error('No se pudo verificar la llave pública');
          }
          await StorageAdapter.setItem(
            'publicKey-server',
            response.data.publicKey,
          );

          originalRequest.data = originalPayload;
          return axiosApi(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(
      new Error(error.response?.data?.message || error.message),
    );
  },
);

export {axiosApi};
