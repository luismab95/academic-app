import {jwtDecode} from 'jwt-decode';
import {create} from 'zustand';
import {AuthSession} from '../../domian/entittes/auth';
import {User} from '../../domian/entittes/user';
import {StorageAdapter} from '../../infrastructure/adapters/storage';

interface AuthStore {
  accessToken: string;
  refreshToken: string;
  sessionId: number;
  login?: (session: AuthSession) => Promise<void>;
  logout?: () => Promise<void>;
  checkStatus?: () => boolean;
  getPayloadToken?: () => Partial<User>;
}

export const authStore = create<AuthStore>((set, get) => ({
  accessToken: '',
  refreshToken: '',
  sessionId: 0,
  login: async (session: AuthSession) => {
    await StorageAdapter.setItem('session', JSON.stringify(session));
    set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session.sessionId,
    });
  },
  logout: async () => {    
    await StorageAdapter.removeItem('session');
    set({accessToken: '', refreshToken: '', sessionId: 0});
  },
  getPayloadToken: () => {
    const token = get().accessToken;
    if (token !== '') {
      const payload = jwtDecode<{
        userId: number;
        fullname: string;
        email: string;
      }>(token);
      return {
        id: payload.userId,
        fullname: payload.fullname,
        email: payload.email,
      } as Partial<User>;
    }
    return {} as Partial<User>;
  },
  checkStatus: () => {
    const sessionId = get().sessionId;
    if (sessionId !== 0) {
      return true;
    }
    return false;
  },
}));
