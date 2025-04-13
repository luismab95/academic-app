import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CertificateDetailScreen,
  CertificateDownloadScreen,
  CertificateScreen,
} from '../Screens';

const Stack = createNativeStackNavigator();

export const CertificateNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Certificate">
      <Stack.Screen
        name="Certificate"
        component={CertificateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CertificateDetail"
        component={CertificateDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CertificateDownload"
        component={CertificateDownloadScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
