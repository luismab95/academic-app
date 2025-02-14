import {GeneralResponse} from '../../shared/interface/general.interface';
import {AuthSession} from '../entittes/auth';
import {User} from '../entittes/user';

export interface AuthGateway {
  signIn(
    email: string,
    password: string,
  ): Promise<GeneralResponse<string> | null>;
  signInMfa(
    email: string,
    method: 'email' | 'sms',
    otp: string,
    device: string,
  ): Promise<GeneralResponse<AuthSession> | null>;
  signUp(user: User): Promise<GeneralResponse<string> | null>;
  signOut(): Promise<void>;
}
