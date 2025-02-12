import {Button, Divider, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {useState} from 'react';
import {ForgotPasswordForm, UserAvatar, VerifyOtp} from '../../components';
import {ResetPasswordForm} from '../../components/ui/ResetPasswordForm';

interface Props extends StackScreenProps<RootStackParams, 'SecurityScreen'> {}

export const SecurityScreen = ({navigation}: Props) => {
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const onVerifyOtp = () => {
    setVerifyOtp(true);
  };

  const onResendOtp = () => {
    console.log('Resend OPT');
  };

  const onForgotPassword = () => {
    setForgotPassword(true);
  };

  const onResetPassword = () => {
    console.log('Reset Password');
  };

  return (
    <>
      <TopNavigationApp title="Seguridad" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          {forgotPassword ? (
            verifyOtp ? (
              <ResetPasswordForm onResetPassword={onResetPassword} />
            ) : (
              <VerifyOtp onVerifyOtp={onVerifyOtp} onResendOtp={onResendOtp} />
            )
          ) : (
            <ForgotPasswordForm onForgotPassword={onForgotPassword} />
          )}
        </ScrollView>
      </Layout>
    </>
  );
};
