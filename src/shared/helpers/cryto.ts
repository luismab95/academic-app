import {RSA} from 'react-native-rsa-native';
import {StorageAdapter} from '../../infrastructure/adapters/storage';

export const generateKeys = async () => {
  const keySize = 4096;
  const keys = await RSA.generateKeys(keySize);

  await StorageAdapter.setItem('publicKey', keys.public);
  await StorageAdapter.setItem('privateKey', keys.private);
};
