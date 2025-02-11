import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import * as eva from '@eva-design/eva';

export const appTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? eva.dark : eva.light;
};

export const appThemeNavigation = () => {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    dark: colorScheme === 'dark',
    colors: {...navigationTheme.colors},
  };
};
