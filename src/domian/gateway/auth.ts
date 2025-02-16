import {GeneralResponse} from '../../shared';
import {AuthSession, otpMethod, otpType, User} from '../';

export interface AuthGateway {
  signIn(
    email: string,
    password: string,
  ): Promise<GeneralResponse<string> | null>;
  signInMfa(
    email: string,
    method: otpMethod,
    otp: string,
    device: string,
  ): Promise<GeneralResponse<AuthSession> | null>;
  signUp(user: User): Promise<GeneralResponse<string> | null>;
  signOut(sessionId: number): Promise<void>;
  forgotPassword(
    contact: string,
    method: otpMethod,
    type: otpType,
  ): Promise<GeneralResponse<string> | null>;
  verifyForgotPassword(
    contact: string,
    method: otpMethod,
    otp: string,
    type: otpType,
  ): Promise<GeneralResponse<{userId: number; message: string}> | null>;
  getPublicKey(): Promise<GeneralResponse<{
    publicKey: string;
    sha256Hash: string;
  }> | null>;
}
