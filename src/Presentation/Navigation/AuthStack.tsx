import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-notifications';
import DeviceInfo from 'react-native-device-info';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StorageAdapter} from '../../Infrastructure';
import {createDevice, servicesContainer} from '../../Shared';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignInMfaScreen,
  SignupScreen,
  VerifyForgotPasswordMfaScreen,
  WelcomeScreen,
} from '../Screens';
import {AlertError, AnimatedLoading, CustomError} from '../Components';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [routeName, setRouteName] = useState<string>('Welcome');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorService, setErrorService] = useState<boolean>(false);
  const [retry, setRetry] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const findDevice = async () => {
      setErrorService(false);
      const serie = await DeviceInfo.getUniqueId();
      const response = await servicesContainer.device.getDeviceBySerie(serie);

      if (response === null) {
        setErrorService(true);
        setLoading(false);
        return;
      }

      if (typeof response.data === 'string') {
        setRouteName('Welcome');
      } else {
        const privateKey = await StorageAdapter.getItem('privateKey');
        const publicKey = await StorageAdapter.getItem('publicKey');
        if (privateKey === null || publicKey === null) {
          await onCreateDevice();
        }
        setRouteName('Login');
      }
      setLoading(false);
    };

    const timer = setTimeout(() => {
      findDevice();
    }, 2000);

    return () => clearTimeout(timer);
  }, [retry]);

  const onCreateDevice = async () => {
    const response = await createDevice();

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
    }
  };

  const handleRetry = () => {
    setRetry(!retry);
  };

  return (
    <>
      {loading ? (
        <AnimatedLoading />
      ) : (
        <>
          {errorService ? (
            <CustomError loading={loading} handleRetry={handleRetry} />
          ) : (
            <Stack.Navigator initialRouteName={routeName}>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignInMfa"
                component={SignInMfaScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={SignupScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VerifyForgotPasswordMfa"
                component={VerifyForgotPasswordMfaScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default AuthStack;
