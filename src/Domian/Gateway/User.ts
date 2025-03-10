import {GeneralResponse} from '../../Shared';
import {otpMethod, otpType, User} from '..';

export interface UserGateway {
  updatePassword: (
    password: string,
    otp: string,
    method: otpMethod,
    userId: number,
    type: otpType,
  ) => Promise<GeneralResponse<string> | null>;
  getUserById(userId: number): Promise<GeneralResponse<User> | null>;
  updateUser(
    user: User,
    userId: number,
  ): Promise<GeneralResponse<string> | null>;
}
