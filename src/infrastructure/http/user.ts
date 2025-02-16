import {otpMethod, otpType, User} from '../../domian';
import {UserGateway} from '../../domian/gateway/user';
import {errorStore, GeneralResponse} from '../../shared';
import {axiosApi} from '../adapters/axiosApi';

export class UserService implements UserGateway {
  async updatePassword(
    password: string,
    otp: string,
    method: otpMethod,
    userId: number,
    type: otpType,
  ): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.patch<GeneralResponse<string>>(
        `/user/pwd/${userId}`,
        {
          password,
          otp,
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

  async getUserById(userId: number): Promise<GeneralResponse<User> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<User>>(
        `/user/${userId}`,
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async updateUser(
    user: User,
    userId: number,
  ): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.put<GeneralResponse<string>>(
        `/user/${userId}`,
        user,
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }
}
