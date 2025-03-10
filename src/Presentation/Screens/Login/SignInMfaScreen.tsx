import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Toast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {AlertError, CustomOptInput} from '../../Components';
import {RootStackParams} from '../../Navigation';
import {SigninScreenStyles} from '../../Styles';
import {authStore, servicesContainer} from '../../../Shared';

interface Props {
  navigation: NavigationProp<RootStackParams, 'Login'>;
}

export const SignInMfaScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {message, email} = route.params as {message: string; email: string};
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);
  const [isValidOtp, setIsValidOtp] = useState<boolean>(false);
  const [resetOtp, setResetOtp] = useState<boolean>(false);

  const [otp, setOtp] = useState<string>('');
  const [sendOtp, setSendOtp] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(300);

  const {login} = authStore();

  useEffect(() => {
    if (seconds <= 0) {
      setSendOtp(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const onVerifyOtp = async (otp: string) => {
    setIsButtonSpinner(true);

    const deviceId = await DeviceInfo.getUniqueId();
    const response = await servicesContainer.auth.signInMfa(
      email,
      'email',
      otp,
      deviceId,
    );

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsButtonSpinner(false);
      return;
    }
    await login!(response.data);
  };

  const onResendOtp = async () => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.auth.forgotPassword(
      email,
      'email',
      'login',
    );

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      return;
    }

    setIsButtonSpinner(false);
  };

  const onGetOtp = (otp: string) => {
    setOtp(otp);
  };

  const onSetValidOtp = (isValid: boolean) => {
    setIsValidOtp(isValid);
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={SigninScreenStyles.container}>
      <ScrollView>
        <Image
          style={SigninScreenStyles.signInImage}
          source={require('./../../../../assets/Images/Sign_in/otp.png')}
        />
        <Text
          style={[
            SigninScreenStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          ¡Verificación MFA!
        </Text>
        <Text
          style={[
            SigninScreenStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          {message}
        </Text>
        <View style={SigninScreenStyles.inputContainer}>
          <CustomOptInput
            length={6}
            onComplete={onGetOtp}
            isValid={onSetValidOtp}
            isLoading={isButtonSpinner}
            resetOtp={resetOtp}
          />

          {!sendOtp ? (
            <Text
              style={[
                SigninScreenStyles.learningText,
                {fontFamily: 'Nunito-SemiBold'},
              ]}>
              Reenviar código en {seconds} segundos
            </Text>
          ) : (
            <TouchableOpacity onPress={() => onResendOtp()}>
              <Text
                style={[
                  SigninScreenStyles.resendOtpSection,
                  {fontFamily: 'Nunito-SemiBold'},
                ]}>
                Reenviar Código
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={SigninScreenStyles.buttonContainer}
            disabled={isButtonSpinner || !isValidOtp}
            onPress={() => onVerifyOtp(otp)}>
            {isButtonSpinner ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={[
                  SigninScreenStyles.buttonText,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                Verificar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
