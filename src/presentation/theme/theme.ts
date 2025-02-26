import {createContext} from 'react';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {ThemeHook} from '../../shared/hooks/ThemeHook';

export const appThemeNavigation = () => {
  const {theme} = ThemeHook();
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    dark: theme === 'dark',
    colors: {...navigationTheme.colors},
  } as ReactNavigation.Theme;
};

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: async () => {},
});
