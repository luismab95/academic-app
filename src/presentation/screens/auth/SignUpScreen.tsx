import {useState} from 'react';
import {Dimensions, Image} from 'react-native';
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
import {User} from '../../../domian';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, SignUpSchema} from '../../../shared';
import {Formik} from 'formik';

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

export const SignUpScreen = ({navigation}: Props) => {
  const screenHeight = Dimensions.get('window').height;

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

  const onSignUp = async (values: Partial<User>, resetForm: () => void) => {
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
    resetForm();
    setIsLoading(false);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
    if (modalInfo.type === 'success') navigation.navigate('SignInScreen');
  };

  return (
    <>
      <TopNavigationApp title="" />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 40}}>
          {/* Imagen */}
          <Layout
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 40,
            }}>
            <Image
              style={{width: '100%', height: 300, resizeMode: 'contain'}}
              source={require('../../../assets/images/register.png')}
            />
          </Layout>

          {/* Título */}
          <Layout style={{marginTop: screenHeight * 0.01}}>
            <Text category="h1">Ingresa tus Datos para Crear tu Cuenta</Text>
          </Layout>

          {/* Inputs */}
          <Formik
            initialValues={{
              email: '',
              password: '',
              name: '',
              lastname: '',
              identification: '',
            }}
            validationSchema={SignUpSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => onSignUp(values, resetForm)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => {
              return (
                <>
                  <Layout style={{marginTop: screenHeight * 0.02}}>
                    <Input
                      placeholder="Nombres"
                      autoCapitalize="words"
                      size="large"
                      status={errors.name && touched.name ? 'danger' : 'basic'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      caption={ErrorFieldForm(errors, touched, 'name')}
                      accessoryLeft={
                        <MyIcon name="text-outline" width={20} height={20} />
                      }
                      disabled={isLoading}
                      style={{marginBottom: 10}}
                    />

                    <Input
                      placeholder="Apellidos"
                      autoCapitalize="words"
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
                      disabled={isLoading}
                      style={{marginBottom: 10}}
                    />

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
                      disabled={isLoading}
                      style={{marginBottom: 10}}
                    />

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
                      disabled={isLoading}
                      style={{marginBottom: 10}}
                    />

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
                      disabled={isLoading}
                      style={{marginBottom: 10}}
                    />
                  </Layout>

                  {/* Botón de Crear Cuenta */}
                  <Layout
                    style={{
                      marginTop: screenHeight * 0.05,
                      alignItems: 'center',
                    }}>
                    <Button
                      style={{borderRadius: 50, width: '100%'}}
                      disabled={isLoading || !isValid}
                      onPress={() => handleSubmit()}>
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

          {/* Enlace para iniciar sesión */}
          <Layout
            style={{
              marginVertical: screenHeight * 0.02,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>¿Ya tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('SignInScreen')}>
              {'  '} Iniciar Sesión {'  '}
            </Text>
          </Layout>
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCloseModal}
        visible={visibleModal}
        shouldUseContainer={false}
        animationType="slide">
        <Message
          title={modalInfo.title}
          content={modalInfo.content}
          type={modalInfo.type}
          onContinue={onCloseModal}
        />
      </Modal>
    </>
  );
};
