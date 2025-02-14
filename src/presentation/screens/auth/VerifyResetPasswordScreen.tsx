import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {VerifyOtp} from '../../components';

interface Props
  extends StackScreenProps<RootStackParams, 'VerifyResetPasswordScreen'> {}

export const VerifyResetPasswordScreen = ({navigation}: Props) => {
  const onVerifyOtp = async (otp: string) => {};

  const onResendOtp = () => {
    //TODO RESEND OPT
    console.log('Resend OPT');
  };
  return (
    <>
      <TopNavigationApp title="Olvidaste tu Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <VerifyOtp
            isLoading={false}
            message={'Ingresa el código que te enviamos a tu correo'}
            onVerifyOtp={onVerifyOtp}
            onResendOtp={onResendOtp}
          />
        </ScrollView>
      </Layout>
    </>
  );
};
