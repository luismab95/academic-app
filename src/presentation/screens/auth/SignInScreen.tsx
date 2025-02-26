import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Input, Layout, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ButtonLoading,
  ErrorFieldForm,
  HeaderForm,
  InputPassword,
  ModalApp,
  MyIcon,
  PropsMessageModal,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {ModalHook, SignInSchema, errorStore} from '../../../shared';

interface SignIn {
  email: string;
  password: string;
}

interface Props extends StackScreenProps<RootStackParams, 'SignInScreen'> {}

export const SignInScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onLogin = async (values: SignIn, resetForm: () => void) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.signIn(
      values.email,
      values.password,
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
    resetForm();

    navigation.navigate('SignInMfaScreen', {
      message: response.data,
      email: values.email,
    });
  };

  return (
    <>
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          <HeaderForm
            image={require('../../../assets/images/login.png')}
            title="Inicie Sesión en su Cuenta"
          />

          {/* Inputs */}
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={SignInSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => onLogin(values, resetForm)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <>
                <Layout style={{marginTop: height * 0.02}}>
                  <Input
                    disabled={isLoading}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    status={errors.email && touched.email ? 'danger' : 'basic'}
                    size="large"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    caption={ErrorFieldForm(errors, touched, 'email')}
                    accessoryLeft={
                      <MyIcon name="email-outline" width={20} height={20} />
                    }
                  />

                  <InputPassword
                    placeholder="Contraseña"
                    field="password"
                    values={values}
                    errors={errors}
                    touched={touched}
                    isLoading={isLoading}
                    secureTextEntry={secureTextEntry}
                    toggleSecureEntry={toggleSecureEntry}
                    handleBlur={handleBlur('password')}
                    handleChange={handleChange('password')}
                  />
                </Layout>

                {/* Botón de Iniciar Sesión */}
                <Layout
                  style={{
                    marginTop: height * 0.04,
                    alignItems: 'center',
                  }}>
                  <ButtonLoading
                    isLoading={isLoading}
                    isValid={isValid}
                    label="Iniciar Sesión"
                    handleSubmit={handleSubmit}
                  />
                </Layout>
              </>
            )}
          </Formik>

          {/* Enlace para recuperar contraseña */}
          <Layout style={{marginTop: height * 0.02, alignItems: 'center'}}>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Layout>

          {/* Enlace para crear cuenta */}
          <Layout
            style={{
              marginVertical: height * 0.03,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>¿No tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('SignUpScreen')}>
              {'  '} Regístrate {'  '}
            </Text>
          </Layout>
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModal}
        modalInfo={modalInfo}
      />
    </>
  );
};
