import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {faShield, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {AnimatedLoading, CustomDrawerHeader} from '../../Components';
import {RootStackParams} from '../../Navigation';
import {authStore} from '../../../Shared';
import {ProfileScreenStyles} from '../../Styles';

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <LinearGradient
          colors={['#E5ECF9', '#F6F7F9']}
          style={ProfileScreenStyles.container}>
          <CustomDrawerHeader>Perfil</CustomDrawerHeader>

          <ScrollView>
            <LinearGradient
              colors={['#216FDE', '#0751BC']}
              end={{x: 1, y: 0.9}}
              style={ProfileScreenStyles.mainBannerContainer}>
              <View style={ProfileScreenStyles.bannerContainer}>
                <View style={ProfileScreenStyles.userImageBorder}>
                  <Text style={ProfileScreenStyles.userText}>
                    {user.fullname?.charAt(0).toUpperCase()}
                    {user.fullname?.charAt(1).toUpperCase()}
                  </Text>
                </View>
                <View style={ProfileScreenStyles.userNameSection}>
                  <Text
                    style={[
                      ProfileScreenStyles.userNameText,
                      {fontFamily: 'Raleway-SemiBold'},
                    ]}>
                    {user.fullname}
                  </Text>
                  <Text
                    style={[
                      ProfileScreenStyles.userNameBottomText,
                      {fontFamily: 'Nunito-Regular'},
                    ]}>
                    {user.email}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={ProfileScreenStyles.accountDetailsContainer}>
              <Text
                style={[
                  [
                    ProfileScreenStyles.accountText,
                    {fontFamily: 'Raleway-Bold'},
                  ],
                ]}>
                Detalles de la cuenta
              </Text>
              <TouchableOpacity
                style={ProfileScreenStyles.detailWrapper}
                onPress={() => navigation.navigate('SettingsPage')}>
                <View style={ProfileScreenStyles.detailLeftSection}>
                  <View style={ProfileScreenStyles.detailUserIcon}>
                    <FontAwesomeIcon
                      style={ProfileScreenStyles.iconCenter}
                      icon={faUser}
                      size={20}
                      color={'gray'}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        ProfileScreenStyles.boldText,
                        {fontFamily: 'Nunito-Bold'},
                      ]}>
                      Editar Perfil
                    </Text>
                    <Text
                      style={[
                        ProfileScreenStyles.regularText,
                        {fontFamily: 'Nunito-Regular'},
                      ]}>
                      Actualiza tu información personal.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={ProfileScreenStyles.detailWrapper}
                onPress={() => navigation.navigate('SecurityPage')}>
                <View style={ProfileScreenStyles.detailLeftSection}>
                  <View style={ProfileScreenStyles.detailUserIcon}>
                    <FontAwesomeIcon
                      style={ProfileScreenStyles.iconCenter}
                      icon={faShield}
                      size={20}
                      color={'gray'}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        ProfileScreenStyles.boldText,
                        {fontFamily: 'Nunito-Bold'},
                      ]}>
                      Seguridad
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        ProfileScreenStyles.regularText,
                        {fontFamily: 'Nunito-Regular'},
                      ]}>
                      Gestiona tu contraseña, para proteger tu cuenta.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
};
