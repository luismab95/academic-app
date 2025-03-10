import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {StorageAdapter} from '../../Infrastructure';
import {AcademicRecord, AuthSession, otpMethod} from '../../Domian';
import {authStore} from '../../Shared';

export type RootStackParams = {
  Welcome: undefined;
  Login: undefined;
  SignInMfa: {message: string; email: string};
  HomePage: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyForgotPasswordMfa: {
    message: string;
    contact: string;
    method: otpMethod;
  };
  ResetPassword: {method: otpMethod; otp: string; userId: number};
  ProfilePage: undefined;
  SettingsPage: undefined;
  SecurityPage: undefined;
  PrivacyPolicy: undefined;
  Certificate: undefined;
  CertificateDetail: {item: AcademicRecord};
  Activity: undefined;
  Certificados: undefined;
};

export const AppNavigation = () => {
  const {checkStatus, login} = authStore();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await StorageAdapter.getItem('session');
      if (session !== null) {
        const authSession = JSON.parse(session) as AuthSession;
        await login!(authSession);
      }
    };

    fetchSession();
  }, [checkStatus!()]);

  return (
    <NavigationContainer>
      {checkStatus!() ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
