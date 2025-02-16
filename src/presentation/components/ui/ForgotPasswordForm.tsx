import {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';
import {
  Button,
  Card,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {appThemeNavigation} from '../../theme/theme';
import {validateEmail, validatePhoneNumber} from '../../../shared';
import {MyIcon} from './Icon';
import {LoadingIndicator} from './LoadingIndicator';
import {useFocusEffect} from '@react-navigation/native';
import {otpMethod} from '../../../domian';

interface Props {
  isLoading: boolean;
  onForgotPassword: (contact: string, method: otpMethod) => void;
}

export const ForgotPasswordForm = ({isLoading, onForgotPassword}: Props) => {
  const screenHeight = Dimensions.get('window').height;

  const [method, setMethod] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [contactTouched, setContactouched] = useState<boolean>(false);

  const theme = useTheme();
  const appTheme = appThemeNavigation();

  const onSetMethod = (value: string) => {
    setMethod(value);
  };

  useFocusEffect(
    useCallback(() => {
      setMethod('');
      setContact('');
      setContactouched(false);
      setIsValid(false);
    }, []),
  );

  const onValidContact = (value: string) => {
    if (method === 'email') setIsValid(validateEmail(value));
    if (method === 'sms') setIsValid(validatePhoneNumber(value));
    setContact(value);
    setContactouched(true);
  };

  return (
    <>
      {/* IMAGE */}
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
        <Image
          style={{width: '100%', height: 300, resizeMode: 'contain'}}
          source={require('../../../assets/images/forgot-password.png')}
        />
      </Layout>

      {method !== '' ? (
        <Layout
          style={{
            marginTop: 1,
            height: screenHeight * 0.3,
          }}>
          <Text
            category="s1"
            style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
            Ingresa el{' '}
            {method === 'email' ? 'correo electrónico' : 'número de celular'}{' '}
            asociado a tu cuenta
          </Text>
          {method === 'email' ? (
            <Input
              disabled={isLoading}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              status={
                !validateEmail(contact) && contactTouched ? 'danger' : 'basic'
              }
              onChangeText={value => {
                onValidContact(value);
              }}
              onBlur={() => setContactouched(true)}
              value={contact}
              caption={
                !validateEmail(contact) && contactTouched
                  ? () => (
                      <Text
                        category="s2"
                        appearance="hint"
                        style={{color: theme['color-danger-500']}}>
                        Correo eléctronico no válido.
                      </Text>
                    )
                  : undefined
              }
              accessoryLeft={
                <MyIcon name="email-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
          ) : (
            <Input
              disabled={isLoading}
              placeholder="Número celular"
              keyboardType="phone-pad"
              autoCapitalize="none"
              size="large"
              maxLength={10}
              status={
                !validatePhoneNumber(contact) && contactTouched
                  ? 'danger'
                  : 'basic'
              }
              onChangeText={value => {
                onValidContact(value);
              }}
              onBlur={() => setContactouched(true)}
              value={contact}
              caption={
                !validatePhoneNumber(contact) && contactTouched
                  ? () => (
                      <Text
                        category="s2"
                        appearance="hint"
                        style={{color: theme['color-danger-500']}}>
                        Número celular no válido.
                      </Text>
                    )
                  : undefined
              }
              accessoryLeft={
                <MyIcon name="smartphone-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
          )}
        </Layout>
      ) : (
        <Layout style={{marginVertical: screenHeight * 0.01}}>
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
          <Card
            onPress={() => onSetMethod('sms')}
            style={{
              borderRadius: 20,
              padding: 10,
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
                <MyIcon name="smartphone-outline" color="white" width={80} />
              </Layout>
              <Layout
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginLeft: 20,
                }}>
                <Text style={{marginBottom: 4}}>vía SMS:</Text>
                <Text>+593*******11</Text>
              </Layout>
            </Layout>
          </Card>
          <Layout style={{height: 20}} />
        </Layout>
      )}

      {/* Button */}
      <Layout style={{marginVertical: screenHeight * 0.01}}>
        {method !== '' && (
          <Button
            style={{borderRadius: 40}}
            disabled={isLoading || !isValid}
            onPress={() => onForgotPassword(contact, method as otpMethod)}>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Continuar
                </Text>
              )
            )}
          </Button>
        )}
      </Layout>

      {/* Space */}
      <Layout style={{height: 40}} />
    </>
  );
};
