import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {MyIcon} from '../../components/ui/Icon';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationSimpleUsageShowcase} from '../../components/ui/TopNavigation';
import {appThemeNavigation} from '../../theme/theme';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  return (
    <>
      <TopNavigationSimpleUsageShowcase title="Olvidaste tu Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          {/* Space */}
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              paddingHorizontal: 40,
            }}>
            <Image
              source={require('../../../assets/images/forgot-password.png')}
            />
          </Layout>

          {/* Inputs */}
          <Layout style={{marginTop: 30}}>
            <Text
              category="s1"
              style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
              Seleccione qué datos de contacto debemos utilizar para restablecer
              su contraseña
            </Text>
            <Card
              style={{
                borderRadius: 20,
                padding: 10,
                borderColor: appThemeNavigation().colors.primary,
              }}>
              <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                <Layout
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appThemeNavigation().colors.primary,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}>
                  <MyIcon name="email-outline" color='white' width={80} />
                </Layout>
                <Layout
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text style={{marginBottom: 4}}>vía Correo electrónico:</Text>
                  <Text>your*****@me</Text>
                </Layout>
              </Layout>
            </Card>
            <Layout style={{height: 20}} />
            {/* <Card style={{borderRadius: 20, padding: 10}}>
              <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                <Layout
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appThemeNavigation().colors.primary,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}>
                  <MyIcon name="message-circle-outline" color='white' width={80} />
                </Layout>
                <Layout
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text style={{marginBottom: 4}}>vía SMS:</Text>
                  <Text>+593*****09</Text>
                </Layout>
              </Layout>
            </Card> */}
          </Layout>

          {/* Space */}
          <Layout style={{height: 80}} />

          {/* Button */}
          <Layout>
            <Button
              style={{borderRadius: 40}}
              // disabled={isPosting}
              onPress={() => navigation.navigate('VerifyResetPasswordScreen')}>
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Continuar
                </Text>
              )}
            </Button>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />
        </ScrollView>
      </Layout>
    </>
  );
};
