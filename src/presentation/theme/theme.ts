import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createContext} from 'react';

export const appThemeNavigation = () => {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    dark: colorScheme === 'dark',
    colors: {...navigationTheme.colors},
  };
};

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});
