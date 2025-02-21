import {useState} from 'react';
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
  const [contactTouched, setContactTouched] = useState<boolean>(false);
  const theme = useTheme();
  const appTheme = appThemeNavigation();

  const onSetMethod = (value: string) => {
    setMethod(value);
  };

  const validateContact = (contact: string) => {
    if (method === 'email') {
      return validateEmail(contact);
    } else if (method === 'phone') {
      return validatePhoneNumber(contact);
    }
    return false;
  };

  const handleInputChange = (value: string) => {
    setContact(value);
    setIsValid(validateContact(value));
  };

  const renderInputField = () => {
    const placeholder =
      method === 'email' ? 'Correo electrónico' : 'Número celular';
    const keyboardType = method === 'email' ? 'email-address' : 'phone-pad';
    const maxLength = method === 'phone' ? 10 : undefined;

    return (
      <Input
        disabled={isLoading}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        size="large"
        maxLength={maxLength}
        status={
          !validateContact(contact) && contactTouched ? 'danger' : 'basic'
        }
        onChangeText={handleInputChange}
        onBlur={() => setContactTouched(true)}
        value={contact}
        caption={
          !validateContact(contact) && contactTouched ? (
            <Text
              category="s2"
              appearance="hint"
              style={{color: theme['color-danger-500']}}>
              {method === 'email'
                ? 'Correo electrónico no válido.'
                : 'Número celular no válido.'}
            </Text>
          ) : undefined
        }
        accessoryLeft={
          <MyIcon
            name={method === 'email' ? 'email-outline' : 'phone-outline'}
            width={20}
            height={20}
          />
        }
        style={{marginBottom: 10}}
      />
    );
  };

  const renderFormHeader = () => {
    return (
      <Text
        category="s1"
        style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
        Ingresa el{' '}
        {method === 'email' ? 'correo electrónico' : 'número de celular'}{' '}
        asociado a tu cuenta
      </Text>
    );
  };

  const handleSubmit = () => {
    onForgotPassword(contact, method as otpMethod);
  };

  const renderButton = () => {
    return (
      <Layout style={{marginVertical: screenHeight * 0.04}}>
        <Button
          style={{borderRadius: 40}}
          disabled={isLoading || !isValid}
          onPress={handleSubmit}>
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
      </Layout>
    );
  };

  return (
    <>
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
      {method === '' ? (
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
      ) : (
        <Layout style={{height: screenHeight * 0.3}}>
          {renderFormHeader()}
          {renderInputField()}
          {renderButton()}
        </Layout>
      )}

      {/* Space */}
      <Layout style={{height: 40}} />
    </>
  );
};
