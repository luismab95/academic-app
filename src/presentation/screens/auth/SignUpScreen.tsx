import {useCallback, useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../domian/entittes/user';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared/store/error.store';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo Electrónico no válido.')
    .required('Correo Electrónico es obligatorio.'),
  password: Yup.string()
    .required('Contraseña es obligatorio.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    ),
  name: Yup.string().required('Nombre es obligatorio.'),
  lastname: Yup.string().required('Apellido es obligatorio.'),
  identification: Yup.string()
    .required('Identificación es obligatorio.')
    .matches(/^\d{10}$/, 'Identificación no válida.'),
});

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

export const SignUpScreen = ({navigation}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const {height} = useWindowDimensions();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSignUp = async (values: Partial<User>) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.signUp(values as User);

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

    setModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
    if (modalInfo.type === 'success') navigation.navigate('SignInScreen');
  };

  return (
    <>
      <TopNavigationApp title="" />
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
              source={require('../../../assets/images/register.png')}
            />
          </Layout>

          <Layout style={{paddingTop: 0}}>
            <Text category="h1">Ingresa tus Datos para Crear tu Cuenta</Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Inputs */}
          <Formik
            initialValues={
              {
                email: '',
                password: '',
                name: '',
                lastname: '',
                identification: '',
              } as Partial<User>
            }
            validationSchema={SignUpSchema}
            validateOnMount
            onSubmit={values => onSignUp(values)}>
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
                      placeholder="Nombres"
                      autoCapitalize="none"
                      size="large"
                      status={errors.name && touched.name ? 'danger' : 'basic'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      caption={ErrorFieldForm(errors, touched, 'name')}
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
                      status={
                        errors.lastname && touched.lastname ? 'danger' : 'basic'
                      }
                      onChangeText={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      value={values.lastname}
                      caption={ErrorFieldForm(errors, touched, 'lastname')}
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
                      status={
                        errors.identification && touched.identification
                          ? 'danger'
                          : 'basic'
                      }
                      onChangeText={handleChange('identification')}
                      onBlur={handleBlur('identification')}
                      value={values.identification}
                      caption={ErrorFieldForm(
                        errors,
                        touched,
                        'identification',
                      )}
                      accessoryLeft={
                        <MyIcon
                          name="credit-card-outline"
                          width={20}
                          height={20}
                        />
                      }
                      style={{marginBottom: 10}}
                    />
                    <Layout style={{height: 10}} />

                    <Input
                      placeholder="Correo electrónico"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      size="large"
                      status={
                        errors.email && touched.email ? 'danger' : 'basic'
                      }
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
                      secureTextEntry={!secureTextEntry}
                      status={
                        errors.password && touched.password ? 'danger' : 'basic'
                      }
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

                  {/* Button */}
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
                            Crear Cuenta
                          </Text>
                        )
                      )}
                    </Button>
                  </Layout>
                </>
              );
            }}
          </Formik>

          {/* Información para crear cuenta */}
          <Layout style={{height: 30}} />
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
