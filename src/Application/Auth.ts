import {User, AuthGateway, otpType, otpMethod} from '../Domian';
import {authStore} from '../Shared';

export class AuthActions {
  constructor(private readonly authGateway: AuthGateway) {}

  async signIn(email: string, password: string) {
    return await this.authGateway.signIn(email, password);
  }

  async signInMfa(
    email: string,
    method: otpMethod,
    otp: string,
    device: string,
  ) {
    const response = await this.authGateway.signInMfa(
      email,
      method,
      otp,
      device,
    );

    if (response !== null)
      authStore.setState({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        sessionId: response.data.sessionId,
      });

    return response;
  }

  async signOut() {
    const {sessionId} = authStore.getState();

    await this.authGateway.signOut(sessionId);
  }

  async signUp(user: User) {
    return await this.authGateway.signUp(user);
  }

  async forgotPassword(contact: string, method: otpMethod, type: otpType) {
    return await this.authGateway.forgotPassword(contact, method, type);
  }

  async verifyForgotPassword(
    contact: string,
    method: otpMethod,
    otp: string,
    type: otpType,
  ) {
    return await this.authGateway.verifyForgotPassword(
      contact,
      method,
      otp,
      type,
    );
  }

  async getPublicKey() {
    return await this.authGateway.getPublicKey();
  }
}
