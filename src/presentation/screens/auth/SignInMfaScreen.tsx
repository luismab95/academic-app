import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {VerifyOtp} from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'SignInMfaScreen'> {}

export const SignInMfaScreen = ({navigation}: Props) => {
  const onVerifyOtp = () => {
    navigation.navigate('HomeScreen');
  };

  const onResendOtp = () => {
    console.log('Resend OPT');
  };

  return (
    <>
      <TopNavigationApp title="Verificación MFA" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <VerifyOtp onVerifyOtp={onVerifyOtp} onResendOtp={onResendOtp} />
        </ScrollView>
      </Layout>
    </>
  );
};
