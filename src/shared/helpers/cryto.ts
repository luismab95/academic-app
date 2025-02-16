import QuickCrypto from 'react-native-quick-crypto';
import Aes from 'react-native-aes-crypto';
import {Buffer} from 'buffer';
import {StorageAdapter} from '../../infrastructure/adapters/storage';
import {CRYPTO_SECRET} from '@env';
import {EncryptedData} from '../interface/general.interface';
import {log} from 'console';

export const generateKeys = async () => {
  try {
    const {publicKey, privateKey} = QuickCrypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: CRYPTO_SECRET,
      },
    });

    await StorageAdapter.setItem('publicKey', publicKey?.toString()!);
    await StorageAdapter.setItem('privateKey', privateKey?.toString()!);

    console.log('Keys generated successfully!');
  } catch (error) {
    console.error(`Error generating keys: ${error}`);
  }
};

export const generateSHA256Hash = (text: string) => {
  return QuickCrypto.createHash('sha256').update(text).digest('hex');
};

export const validHash = (text: string, hash: string) => {
  const newHash = generateSHA256Hash(text);
  return newHash === hash;
};

export const generateAESKey = async (): Promise<string> => {
  return await Aes.randomKey(32);
};

export const encryptAES = async (
  text: string,
  key: string,
): Promise<{encrypted: string; iv: string}> => {
  const iv = await Aes.randomKey(16);

  const encrypted = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
  return {encrypted, iv};
};

export const decryptAES = async (
  encryptedText: string,
  key: string,
  iv: string,
) => {
  return await Aes.decrypt(encryptedText, key, iv, 'aes-256-cbc');
};

export const encryptAESKeyWithRSA = (
  aesKey: string,
  publicKey: string,
): string => {
  return QuickCrypto.publicEncrypt(
    {
      key: publicKey,
      padding: QuickCrypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(aesKey, 'utf-8'),
  ).toString('base64');
};

export const decryptAESKeyWithRSA = (
  encryptedAESKey: string,
  serverPrivateKey: string,
) => {
  return QuickCrypto.privateDecrypt(
    {
      key: serverPrivateKey,
      padding: QuickCrypto.constants.RSA_PKCS1_OAEP_PADDING,
      passphrase: CRYPTO_SECRET,
    },
    Buffer.from(encryptedAESKey, 'base64'),
  ).toString('utf-8');
};

export const encryptedData = async (data: any, publicKey: string) => {
  try {
    const stringData =
      Array.isArray(data) || typeof data === 'object'
        ? JSON.stringify(data)
        : data;

    const aesKey = await generateAESKey();

    const {encrypted, iv} = await encryptAES(stringData, aesKey);

    const encryptedAESKey = encryptAESKeyWithRSA(aesKey, publicKey);

    return {
      encryptedAESKey,
      encryptedMessage: encrypted,
      iv,
    } as EncryptedData;
  } catch (error) {
    throw new Error(`Error encrypting data: ${error}`);
  }
};

export const decryptedData = async (payload: EncryptedData) => {
  try {
    const {encryptedAESKey, encryptedMessage, iv} = payload;

    const privateKey = await StorageAdapter.getItem('privateKey');

    const aesKey = decryptAESKeyWithRSA(encryptedAESKey, privateKey!);

    const decryptedMessage = await decryptAES(encryptedMessage, aesKey, iv);

    try {
      return JSON.parse(decryptedMessage);
    } catch (jsonError) {
      return decryptedMessage;
    }
  } catch (error) {
    throw new Error(`Error dencrypting data: ${error}`);
  }
};
