import QuickCrypto from 'react-native-quick-crypto';
import Aes from 'react-native-aes-crypto';
import {Buffer} from 'buffer';
import {StorageAdapter} from '../../infrastructure/adapters/storage';
import {CRYPTO_SECRET} from '@env';
import {EncryptedData} from '../interface/general.interface';

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

export const encryptAES = (text: string, key: string) => {
  const iv = QuickCrypto.randomBytes(16);
  const cipher = QuickCrypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    iv,
  );

  let encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encrypted: encrypted.toString('base64'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  };
};

export const decryptAES = (
  encryptedText: string,
  key: string,
  iv: string,
  tag: string,
): string => {
  const keyBuffer = Buffer.from(key, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');
  const tagBuffer = Buffer.from(tag, 'hex');

  const decipher = QuickCrypto.createDecipheriv(
    'aes-256-gcm',
    keyBuffer,
    ivBuffer,
  );
  decipher.setAuthTag(tagBuffer);

  let decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'base64')),
    decipher.final(),
  ]).toString('utf8');

  return decrypted;
};

export const encryptWithRSA = (aesKey: string, publicKey: string): string => {
  return QuickCrypto.publicEncrypt(
    {
      key: publicKey,
      padding: QuickCrypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(aesKey, 'utf-8'),
  ).toString('base64');
};

export const decryptWithRSA = (
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

    const {encrypted, iv, tag} = encryptAES(stringData, aesKey);

    const encryptedAESKey = encryptWithRSA(aesKey, publicKey);
    const encryptedTag = encryptWithRSA(tag, publicKey);

    return {
      encryptedAESKey,
      encryptedMessage: encrypted,
      iv,
      tagRSA: encryptedTag,
    } as EncryptedData;
  } catch (error) {
    throw new Error(`Error encrypting data: ${error}`);
  }
};

export const decryptedData = async (payload: EncryptedData) => {
  try {
    const {encryptedAESKey, encryptedMessage, iv, tagRSA} = payload;

    const privateKey = await StorageAdapter.getItem('privateKey');

    const aesKey = decryptWithRSA(encryptedAESKey, privateKey!);
    const tag = decryptWithRSA(tagRSA, privateKey!);

    const decryptedMessage = decryptAES(encryptedMessage, aesKey, iv, tag);

    try {
      return JSON.parse(decryptedMessage);
    } catch (jsonError) {
      return decryptedMessage;
    }
  } catch (error) {
    throw new Error(`Error dencrypting data: ${error}`);
  }
};
