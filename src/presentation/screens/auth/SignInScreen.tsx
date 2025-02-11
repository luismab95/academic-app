import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, CheckBox, Input, Layout, Text} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {MyIcon} from '../../components/ui/Icon';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationSimpleUsageShowcase} from '../../components/ui/TopNavigation';

interface Props extends StackScreenProps<RootStackParams, 'SignInScreen'> {}

export const SignInScreen = ({navigation}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const {height} = useWindowDimensions();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <>
      <TopNavigationSimpleUsageShowcase title="" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <Layout style={{paddingTop: height * 0.22}}>
            <Text category="h1">Inicie Sesión en su Cuenta</Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />

          {/* Inputs */}
          <Layout style={{marginTop: 20}}>
            <Input
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="email-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Contraseña"
              autoCapitalize="none"
              size="large"
              secureTextEntry={!secureTextEntry}
              // value={form.password}
              // onChangeText={password => setForm({...form, password})}
              accessoryLeft={
                <MyIcon name="lock-outline" width={20} height={20} />
              }
              accessoryRight={
                <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                  <MyIcon
                    name={!secureTextEntry ? 'eye' : 'eye-off'}
                    width={20}
                    height={20}
                  />
                </TouchableWithoutFeedback>
              }
              style={{marginBottom: 10}}
            />
          </Layout>

          {/* Remenber me */}
          <Layout
            style={{
              marginTop: 30,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <CheckBox status="primary">{`Recuerdame`}</CheckBox>
          </Layout>

          {/* Button */}
          <Layout style={{marginTop: 30}}></Layout>
          <Layout>
            <Button
              style={{borderRadius: 50}}
              // disabled={isPosting}
              // onPress={onLogin}>
              onPress={() => navigation.navigate('SignInMfaScreen')}>
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Iniciar Sesión
                </Text>
              )}
            </Button>
          </Layout>

          {/* Información para recuperar contraseña */}
          <Layout style={{height: 30}} />
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Layout>

          {/* Información para crear cuenta */}
          <Layout style={{height: 50}} />
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>¿No tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('SignUpScreen')}>
              {'  '}
              Regístrate{'  '}
            </Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />
        </ScrollView>
      </Layout>
    </>
  );
};
