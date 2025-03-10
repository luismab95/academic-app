import {otpMethod, otpType, User, UserGateway} from '../Domian';
import {authStore} from '../Shared';

export class UserActions {
  constructor(private readonly userGateway: UserGateway) {}

  async updatePassword(
    password: string,
    otp: string,
    method: otpMethod,
    userId: number,
    type: otpType,
  ) {
    return await this.userGateway.updatePassword(
      password,
      otp,
      method,
      userId,
      type,
    );
  }

  async getUserById() {
    const {id} = authStore.getState().getPayloadToken!();
    return await this.userGateway.getUserById(id!);
  }

  async updateUser(user: User, userId: number) {
    return await this.userGateway.updateUser(user, userId);
  }
}
