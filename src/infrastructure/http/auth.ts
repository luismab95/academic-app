import {NetworkInfo} from 'react-native-network-info';
import {GeneralResponse} from '../../shared/interface/general.interface';
import {errorStore} from '../../shared/store/error.store';
import {authStore} from '../../shared/store/auth.store';
import {AuthGateway} from '../../domian/gateway/auth';
import {AuthSession} from '../../domian/entittes/auth';
import {axiosApi} from '../adapters/axiosApi';
import {User} from '../../domian/entittes/user';

export class AuthService implements AuthGateway {
  async signIn(
    email: string,
    password: string,
  ): Promise<GeneralResponse<string> | null> {
    email = email.toLowerCase();

    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        '/auth/sign-in',
        {
          email,
          password,
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async signInMfa(
    email: string,
    method: 'email' | 'sms',
    otp: string,
    device: string,
  ): Promise<GeneralResponse<AuthSession> | null> {
    try {
      const ipAddress = await NetworkInfo.getIPV4Address();
      const {data} = await axiosApi.post<GeneralResponse<AuthSession>>(
        '/auth/sign-in/mfa',
        {
          email,
          method,
          otp,
          device,
        },
        {headers: {'x-client-ip': `${ipAddress}`}},
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async signUp(user: User): Promise<GeneralResponse<string> | null> {
    user.email = user.email.toLowerCase();
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        '/auth/sign-up',
        {
          ...user,
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      const {sessionId} = authStore.getState();
      await axiosApi.delete<GeneralResponse<string>>(
        `/auth/sign-out/${sessionId}`,
      );
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
    }
  }
}
