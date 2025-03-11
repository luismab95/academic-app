import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../Screens';

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
