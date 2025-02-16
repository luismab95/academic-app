import {NetworkInfo} from 'react-native-network-info';
import {errorStore, GeneralResponse} from '../../shared/';
import {User, AuthSession, AuthGateway, otpMethod, otpType} from '../../domian';
import {axiosApi} from '../adapters/axiosApi';

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
    method: otpMethod,
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

  async signOut(sessionId: number): Promise<void> {
    try {
      await axiosApi.delete<GeneralResponse<string>>(
        `/auth/sign-out/${sessionId}`,
      );
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
    }
  }

  async forgotPassword(
    contact: string,
    method: otpMethod,
    type: otpType,
  ): Promise<GeneralResponse<string> | null> {
    contact = contact.toLowerCase();
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        '/auth/forgot-password',
        {
          contact,
          method,
          type,
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async verifyForgotPassword(
    contact: string,
    method: otpMethod,
    otp: string,
    type: otpType,
  ): Promise<GeneralResponse<{userId: number; message: string}> | null> {
    contact = contact.toLowerCase();
    try {
      const {data} = await axiosApi.post<
        GeneralResponse<{userId: number; message: string}>
      >('/auth/valid-forgot-password', {
        contact,
        method,
        otp,
        type,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async getPublicKey(): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<string>>(
        '/auth/public-key',
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }
}
