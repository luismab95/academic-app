import {useEffect} from 'react';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {UpdatePasswordHook} from '../../../Shared';
import {otpMethod} from '../../../Domian';

interface Props {
  navigation: NavigationProp<RootStackParams, 'ResetPassword'>;
}
export const ResetPasswordScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {method, otp, userId} = route.params as {
    method: otpMethod;
    otp: string;
    userId: number;
  };

  const {updatePasswordRender, setOtp} = UpdatePasswordHook({
    method,
    type: 'forgot-password',
    userId,
  });

  useEffect(() => {
    setOtp(otp);
  }, []);

  return updatePasswordRender();
};
