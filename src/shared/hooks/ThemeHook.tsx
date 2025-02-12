import {useState} from 'react';

export const ThemeHook = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return {
    theme,
    toggleTheme,
  } as {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  };
};
