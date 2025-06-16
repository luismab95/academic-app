import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen, SecurityScreen, SettingScreen} from '../Screens';

const Stack = createNativeStackNavigator();

export const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProfilePage">
      <Stack.Screen
        name="ProfilePage"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsPage"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SecurityPage"
        component={SecurityScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
