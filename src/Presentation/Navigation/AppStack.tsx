import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faFileShield} from '@fortawesome/free-solid-svg-icons';
import {BottomTabNavigation} from './';
import {CustomDrawer} from '../Components/';
import {PrivacyPolicyScreen} from '../Screens';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeNested"
        component={BottomTabNavigation}
        options={{
          drawerIcon: () => (
            <FontAwesomeIcon icon={faHome} size={22} color={'gray'} />
          ),
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
          drawerIcon: () => (
            <FontAwesomeIcon icon={faFileShield} size={22} color={'gray'} />
          ),
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
