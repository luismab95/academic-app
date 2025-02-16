export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  sessionId: number;
  login?: (session: AuthSession) => void;
  logout?: () => void;
  getPayloadToken?: () => void;
}

export type otpType = 'login' | 'forgot-password' | 'reset-password';
export type otpMethod = 'email' | 'sms';
