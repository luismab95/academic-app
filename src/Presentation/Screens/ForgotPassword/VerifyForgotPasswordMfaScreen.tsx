import {useEffect} from 'react';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {otpMethod} from '../../../Domian';
import {RootStackParams} from '../../Navigation';
import {UpdatePasswordHook} from '../../../Shared';

interface Props {
  navigation: NavigationProp<RootStackParams, 'VerifyForgotPasswordMfa'>;
}

export const VerifyForgotPasswordMfaScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {message, contact, method} = route.params as {
    message: string;
    contact: string;
    method: otpMethod;
  };

  const {verifyMfaRender, setMessage, updatePassword, otp, id} =
    UpdatePasswordHook({
      method,
      type: 'forgot-password',
      contact,
    });

  useEffect(() => {
    setMessage(message);
  }, []);

  useEffect(() => {
    if (updatePassword)
      navigation.navigate('ResetPassword', {
        method,
        otp,
        userId: id!,
      });
  }, [updatePassword]);

  return verifyMfaRender();
};
