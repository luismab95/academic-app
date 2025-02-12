import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {ForgotPasswordForm} from '../../components';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const onForgotPassword = () => {
    navigation.navigate('VerifyResetPasswordScreen');
  };

  return (
    <>
      <TopNavigationApp title="Olvidaste tu Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <ForgotPasswordForm onForgotPassword={onForgotPassword} />
        </ScrollView>
      </Layout>
    </>
  );
};
