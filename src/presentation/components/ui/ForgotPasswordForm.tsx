import {useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {
  Button,
  Card,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {MyIcon} from './Icon';
import {LoadingIndicator} from './LoadingIndicator';
import {otpMethod} from '../../../domian';
import {appThemeNavigation} from '../../theme/theme';
import {validateEmail, validatePhoneNumber} from '../../../shared';

interface Props {
  isLoading: boolean;
  onForgotPassword: (contact: string, method: otpMethod) => void;
}

export const ForgotPasswordForm = ({isLoading, onForgotPassword}: Props) => {
  const {height} = useWindowDimensions();
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
        style={{marginBottom: 20}}
      />
    );
  };

  const renderFormHeader = () => {
    return (
      <Text
        category="p1"
        style={{
          textAlign: 'justify',
          marginBottom: 15,
          marginTop: height * 0.05,
        }}>
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
      <Layout style={{marginVertical: height * 0.05}}>
        <Button
          style={{borderRadius: 50, width: '100%'}}
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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: '100%', height: 300}}
          source={require('../../../assets/images/forgot-password.png')}
          resizeMode="contain"
        />
      </View>

      {method === '' ? (
        <>
          <Layout
            style={{marginBottom: height * 0.04, marginTop: height * 0.02}}>
            <Text
              category="p1"
              style={{
                textAlign: 'justify',
              }}>
              Seleccione qué datos de contacto debemos utilizar para restablecer
              su contraseña
            </Text>
          </Layout>
          <Layout style={{marginBottom: height * 0.04}}>
            <Card
              onPress={() => onSetMethod('email')}
              style={{
                borderRadius: 20,
                padding: 10,
                marginBottom: 20,
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
            <Card
              onPress={() => onSetMethod('sms')}
              style={{
                borderRadius: 20,
                padding: 10,
                marginBottom: 20,
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
          </Layout>
        </>
      ) : (
        <Layout style={{height: height * 0.3}}>
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
