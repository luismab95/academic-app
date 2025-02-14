import {User} from '../domian/entittes/user';
import {AuthGateway} from '../domian/gateway/auth';
import {authStore} from '../shared/store/auth.store';

export class AuthActions {
  constructor(private readonly authGateway: AuthGateway) {}

  async signIn(email: string, password: string) {
    return await this.authGateway.signIn(email, password);
  }

  async signInMfa(
    email: string,
    method: 'email' | 'sms',
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
    await this.authGateway.signOut();
  }

  async signUp(user: User) {
    return await this.authGateway.signUp(user);
  }
}
