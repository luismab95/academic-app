import {View, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

import {authStore} from '../../../Shared';
import {CustomDrawerStyles} from '../../Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {logout, getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={CustomDrawerStyles.container}>
      <View style={CustomDrawerStyles.header}>
        <View style={CustomDrawerStyles.headerImage}>
          <Text style={CustomDrawerStyles.headerImageText}>
            {user.fullname?.charAt(0).toUpperCase()}
            {user.fullname?.charAt(1).toUpperCase()}
          </Text>
        </View>

        <View style={CustomDrawerStyles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              CustomDrawerStyles.headerText,
              {fontFamily: 'Raleway-Bold'},
            ]}>
            {user.fullname}
          </Text>
          <Text
            style={[
              CustomDrawerStyles.headerEmail,
              {fontFamily: 'Nunito-SemiBold'},
            ]}>
            {user.email}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={CustomDrawerStyles.signOutButton}
        onPress={async () => await logout!()}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size={24}
          color={'#2E86C1'}
        />
        <Text
          style={[
            CustomDrawerStyles.signOutText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
