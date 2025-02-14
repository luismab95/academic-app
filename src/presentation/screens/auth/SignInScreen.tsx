import {useCallback, useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Formik} from 'formik';
import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ErrorFieldForm,
  LoadingIndicator,
  Message,
  MyIcon,
  PropsMessageModal,
  TopNavigationApp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared/store/error.store';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo Electrónico no válido.')
    .required('Correo Electrónico es obligatorio.'),
  password: Yup.string().required('Contraseña es obligatorio.'),
});

interface SignIn {
  email: string;
  password: string;
}

interface Props extends StackScreenProps<RootStackParams, 'SignInScreen'> {}

export const SignInScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const onLogin = async (values: SignIn) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.signIn(
      values.email,
      values.password,
    );

    if (response === null) {
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
      setIsLoading(false);

      return;
    }

    navigation.navigate('SignInMfaScreen', {
      message: response.data,
      email: values.email,
    });
  };

  return (
    <>
      <TopNavigationApp title="" leftAction={false} />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 40,
            }}>
            <Image
              style={{height: 400, width: 400}}
              source={require('../../../assets/images/login.png')}
            />
          </Layout>

          <Layout style={{paddingTop: 0}}>
            <Text category="h1">Inicie Sesión en su Cuenta</Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Inputs */}
          <Formik
            initialValues={{email: '', password: ''} as SignIn}
            validationSchema={SignInSchema}
            validateOnMount
            onSubmit={values => onLogin(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
              values,
              touched,
              errors,
              isValid,
            }) => {
              useFocusEffect(
                useCallback(() => {
                  setIsLoading(false);
                  resetForm();
                }, []),
              );
              return (
                <>
                  <Layout style={{marginTop: 20}}>
                    <Input
                      placeholder="Correo electrónico"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      status={
                        errors.email && touched.email ? 'danger' : 'basic'
                      }
                      size="large"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      caption={ErrorFieldForm(errors, touched, 'email')}
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
                      status={
                        errors.password && touched.password ? 'danger' : 'basic'
                      }
                      secureTextEntry={!secureTextEntry}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      caption={ErrorFieldForm(errors, touched, 'password')}
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

                  <Layout style={{marginTop: 30}}></Layout>
                  <Layout>
                    <Button
                      style={{borderRadius: 50}}
                      disabled={isLoading || !isValid}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      {isLoading ? (
                        <LoadingIndicator />
                      ) : (
                        evaProps => (
                          <Text
                            {...evaProps}
                            style={{fontSize: 20, color: 'white'}}
                            category="label">
                            Iniciar Sesión
                          </Text>
                        )
                      )}
                    </Button>
                  </Layout>
                </>
              );
            }}
          </Formik>

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
          <Layout style={{height: 30}} />
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

      {/* MODAL */}
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCloseModal}
        visible={visibleModal}
        children={
          <Message
            title={modalInfo.title}
            content={modalInfo.content}
            type={modalInfo.type}
            onContinue={onCloseModal}
          />
        }></Modal>
    </>
  );
};
