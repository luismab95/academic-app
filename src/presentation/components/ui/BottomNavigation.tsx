import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationTab,
  Icon,
  IconElement,
} from '@ui-kitten/components';
import React from 'react';
import {appThemeNavigation} from '../../theme/theme';

const PersonIcon = (props: any): IconElement => (
  <Icon {...props} name="person-outline" />
);

const FileIcon = (props: any): IconElement => (
  <Icon {...props} name="file-text-outline" />
);

const HomeIcon = (props: any): IconElement => (
  <Icon {...props} name="home-outline" />
);

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

export const BottomNavigationApp = (): React.ReactElement => {
  const topState = useBottomNavigationState();
  const theme = appThemeNavigation();

  return (
    <>
      <BottomNavigation
        appearance="noIndicator"
        style={{
          borderTopColor: theme.colors.border,
          elevation: 10,
          paddingVertical: 10,
        }}
        {...topState}>
        <BottomNavigationTab title="Inicio" icon={HomeIcon} />
        <BottomNavigationTab title="Certificados" icon={FileIcon} />
        <BottomNavigationTab title="Perfil" icon={PersonIcon} />
      </BottomNavigation>
    </>
  );
};
