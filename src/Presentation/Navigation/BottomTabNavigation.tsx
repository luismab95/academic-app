import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {HomeNavigation} from './HomeNavigation';
import {ProfileNavigation} from './ProfileNavigation';
import {CertificateNavigation} from './CertificateNavigation';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  const iconRender = (
    route: RouteProp<ParamListBase, string>,
    color: string,
  ) => {
    let iconName;

    if (route.name === 'Inicio') {
      iconName = require('./../../../assets/Images/icon/HouseSimple.png');
    } else if (route.name === 'Perfil') {
      iconName = require('./../../../assets/Images/icon/User.png');
    } else if (route.name === 'Certificados') {
      iconName = require('./../../../assets/Images/icon/BookBookmark.png');
    }
    return (
      <Image
        style={{width: 25, height: 25, tintColor: color}}
        source={iconName}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Group
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => iconRender(route, color),
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: 'Nunito-SemiBold',
              marginBottom: 15,
            },
            tabBarHideOnKeyboard: true,
            tabBarStyle: {height: 70},
            tabBarIconStyle: {marginTop: 7},
          })}>
          <Tab.Screen
            name="Inicio"
            component={HomeNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Certificados"
            component={CertificateNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileNavigation}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
