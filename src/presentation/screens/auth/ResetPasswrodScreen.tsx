import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {ResetPasswordForm, TopNavigationApp} from '../../components';

interface Props
  extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> {}

export const ResetPasswordScreen = ({navigation}: Props) => {
  const onResetPassword = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <>
      <TopNavigationApp title="Crear Nueva Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <ResetPasswordForm onResetPassword={onResetPassword} />
        </ScrollView>
      </Layout>
    </>
  );
};
