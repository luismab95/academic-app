import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, MD3Theme} from 'react-native-paper';

const darhTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
} as MD3Theme;

const lightTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
} as MD3Theme;

export const appTheme = (): MD3Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darhTheme : lightTheme;
};
