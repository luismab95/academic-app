export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  sessionId: number;
  login?: (session: AuthSession) => void;
  logout?: () => void;
  getPayloadToken?: () => void;
}
