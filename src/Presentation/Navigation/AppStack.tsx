import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faFileShield,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {BottomTabNavigation} from './';
import {CustomDrawer} from '../Components/';
import {PrivacyPolicyScreen} from '../Screens';

interface CustomDrawerProps extends DrawerContentComponentProps {}

const Drawer = createDrawerNavigator();

const customDrawerRender = (props: CustomDrawerProps) => {
  return <CustomDrawer {...props} />;
};

const iconRender = (icon: IconDefinition, size: number, color: string) => {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => customDrawerRender(props)}>
      <Drawer.Screen
        name="HomeNested"
        component={BottomTabNavigation}
        options={{
          drawerIcon: () => iconRender(faHome, 22, 'gray'),
          drawerLabelStyle: {
            fontFamily: 'Nunito-SemiBold',
            marginLeft: 1,
          },
          title: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: () => iconRender(faFileShield, 22, 'gray'),
          drawerLabelStyle: {
            fontFamily: 'Nunito-SemiBold',
            marginLeft: 1,
          },
          title: 'Pólitica de Privacidad',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
