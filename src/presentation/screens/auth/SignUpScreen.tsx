import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/Icon';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {useWindowDimensions} from 'react-native';
import {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationSimpleUsageShowcase} from '../../components/ui/TopNavigation';

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

export const SignUpScreen = ({navigation}: Props) => {
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
            <Text category="h1">Ingresa tus Datos para Crear tu Cuenta</Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />

          {/* Inputs */}
          <Layout style={{marginTop: 20}}>
            <Input
              placeholder="Nombres"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="text-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Apellidos"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="text-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Identificación"
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={10}
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="credit-card-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

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

          {/* Button */}
          <Layout style={{marginTop: 30}}></Layout>
          <Layout>
            <Button
              style={{borderRadius: 50}}
              // disabled={isPosting}
              // onPress={onLogin}>
            >
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Crear Cuenta
                </Text>
              )}
            </Button>
          </Layout>

          {/* Información para crear cuenta */}
          <Layout style={{height: 50}} />
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>¿Ya tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('SignInScreen')}>
              {'  '}
              Iniciar Sesión{'  '}
            </Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />
        </ScrollView>
      </Layout>
    </>
  );
};
