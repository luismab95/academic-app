import {useState} from 'react';
import {Image} from 'react-native';
import {Button, Card, Input, Layout, Text} from '@ui-kitten/components';
import {MyIcon} from './Icon';
import {appThemeNavigation} from '../../theme/theme';

interface Props {
  onForgotPassword: () => void;
}

export const ForgotPasswordForm = ({onForgotPassword}: Props) => {
  const [method, setMethod] = useState<string>('');
  const appTheme = appThemeNavigation();

  const onSetMethod = (value: string) => {
    setMethod(value);
  };

  return (
    <>
      {/* Space */}
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          paddingHorizontal: 40,
        }}>
        <Image source={require('../../../assets/images/forgot-password.png')} />
      </Layout>

      {method === 'email' ? (
        <Layout style={{marginTop: 60}}>
          <Text
            category="s1"
            style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
            Ingresa el correo electrónico asociado a tu cuenta
          </Text>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            size="large"
            // status={
            //   errors.password && touched.password ? 'danger' : 'basic'
            // }
            // onChangeText={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            // caption={ErrorFieldForm(errors, touched, 'password')}
            accessoryLeft={
              <MyIcon name="email-outline" width={20} height={20} />
            }
            style={{marginBottom: 10}}
          />
        </Layout>
      ) : (
        <Layout style={{marginTop: 30}}>
          <Text
            category="s1"
            style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
            Seleccione qué datos de contacto debemos utilizar para restablecer
            su contraseña
          </Text>
          <Card
            onPress={() => onSetMethod('email')}
            style={{
              borderRadius: 20,
              padding: 10,
              borderColor: appTheme.colors.primary,
            }}>
            <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
              <Layout
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: appTheme.colors.primary,
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                }}>
                <MyIcon name="email-outline" color="white" width={80} />
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
        </Layout>
      )}

      {/* Space */}
      <Layout style={{height: 80}} />

      {/* Button */}
      <Layout>
        <Button
          style={{borderRadius: 40}}
          // disabled={isPosting}
          onPress={() => onForgotPassword()}>
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
    </>
  );
};
