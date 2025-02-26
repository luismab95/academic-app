import {useEffect, useState} from 'react';
import {StorageAdapter} from '../../infrastructure/adapters/storage';

interface Props {
  theme: 'light' | 'dark';
  toggleTheme: () => Promise<void>;
}

export const ThemeHook = (): Props => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    async function getTheme() {
      const theme = (await StorageAdapter.getItem('theme')) as 'light' | 'dark';
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
  };
};
