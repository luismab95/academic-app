import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authStore} from '../../../Shared';
import {HeaderStyles} from '../../Styles';

export const Header = () => {
  const navigation = useNavigation<any>();
  const {getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};

  return (
    <View style={HeaderStyles.container}>
      <View style={HeaderStyles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={HeaderStyles.userActive}>
            <Text style={HeaderStyles.userText}>
              {user.fullname?.charAt(0).toUpperCase()}
              {user.fullname?.charAt(1).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={[HeaderStyles.helloText, {fontFamily: 'Raleway-Bold'}]}>
            Hola
          </Text>
          <Text style={[HeaderStyles.text, {fontFamily: 'Raleway-Bold'}]}>
            {user.fullname}
          </Text>
        </View>
      </View>
    </View>
  );
};
