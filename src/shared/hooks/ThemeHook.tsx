import {useEffect, useState} from 'react';
import {StorageAdapter} from '../../infrastructure/adapters/storage';

export const ThemeHook = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    async function getTheme() {
      const theme = await StorageAdapter.getItem('theme');
      if (theme !== null) {
        setTheme(theme);
      }
    }
    getTheme();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    await StorageAdapter.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return {
    theme,
    toggleTheme,
  } as {
    theme: 'light' | 'dark';
    toggleTheme: () => Promise<void>;
  };
};
