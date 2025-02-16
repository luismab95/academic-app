export interface GeneralResponse<T> {
  status: boolean;
  data: T;
}

export interface ErrorResponse {
  message: string;
  setError: (message: string) => void;
  clearError: () => void;
}

export interface EncryptedData {
  encryptedAESKey: string;
  encryptedMessage: string;
  iv: string;
}
