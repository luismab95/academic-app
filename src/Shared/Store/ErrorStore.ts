import {create} from 'zustand';
import {ErrorResponse} from '..';

export const errorStore = create<ErrorResponse>()((set, get) => ({
  message: '',
  setError: (message: string) => set({message}),
  clearError: () => set({message: ''}),
}));
