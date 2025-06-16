import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WelcomeScreenStyles} from '../../Styles';
import {errorStore} from '../../../Shared';

interface Props {
  loading: boolean;
  handleRetry: () => void;
}

export const CustomError = ({loading, handleRetry}: Props) => {
  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9', '#E8EEF9']}
      style={WelcomeScreenStyles.container}>
      <View style={WelcomeScreenStyles.wrapper}>
        <Image
          source={require('../../../../assets/Images/error.png')}
          style={WelcomeScreenStyles.slideImage}
        />
        <Text
          style={[
            WelcomeScreenStyles.title,
            {fontFamily: 'Raleway-Bold', color: 'red'},
          ]}>
          Error de conexión
        </Text>
        <View style={WelcomeScreenStyles.descriptionContainer}>
          <Text
            style={[
              WelcomeScreenStyles.description,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            {errorStore.getState().message}
          </Text>
          <Text
            style={[
              WelcomeScreenStyles.description,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            Verifica tu conexión a internet e inténtalo nuevamente.
          </Text>
        </View>
        <TouchableOpacity
          style={[WelcomeScreenStyles.buttonContainer, {marginTop: 40}]}
          disabled={loading}
          onPress={() => handleRetry()}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text
              style={[
                WelcomeScreenStyles.buttonText,
                {fontFamily: 'Raleway-Bold'},
              ]}>
              Reintentar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
