import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {Opt} from '../../components/ui/Opt';
import {TopNavigationApp} from '../../components/ui/TopNavigation';

interface Props
  extends StackScreenProps<RootStackParams, 'VerifyResetPasswordScreen'> {}

export const VerifyResetPasswordScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <>
      <TopNavigationApp title="Olvidaste tu Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <Layout style={{paddingTop: height * 0.08}}></Layout>

          {/* Space */}
          <Layout style={{height: 50}} />

          {/* Información del código */}
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>El código ha sido enviado a lu***********</Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 60}} />

          {/* Inputs */}
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Opt lenght={4} />
          </Layout>

          {/* Space */}
          <Layout style={{height: 60}} />

          {/* Información para reenviar código */}
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>Reenviar código en</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('SignUpScreen')}>
              {'  '}
              55{'  '}
            </Text>
            <Text>segundos </Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 100}} />

          {/* Button */}
          <Layout>
            <Button
              style={{borderRadius: 50}}
              // disabled={isPosting}
              onPress={() => navigation.navigate('ResetPasswordScreen')}>
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Verificar
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
