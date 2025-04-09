import * as Keychain from 'react-native-keychain';

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({service: key});
    if (credentials) {
      return credentials.password;
    } else {
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    await Keychain.setGenericPassword(key, value, {service: key});
  }

  static async removeItem(key: string): Promise<void> {
    await Keychain.resetGenericPassword({service: key});
  }
}
