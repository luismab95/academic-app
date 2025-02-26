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
  TopNavigationApp,
} from '../../components';
import {User} from '../../../domian';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, ModalHook, SignUpSchema} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

export const SignUpScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSignUp = async (values: Partial<User>, resetForm: () => void) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.signUp(values as User);

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }

    loadModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    resetForm();
    setIsLoading(false);
  };

  const onCloseModalScreen = () => {
    if (modalInfo.type === 'success') navigation.navigate('SignInScreen');
    onCloseModal();
  };

  return (
    <>
      <TopNavigationApp title="" />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          <HeaderForm
            image={require('../../../assets/images/register.png')}
            title="Ingresa tus Datos para Crear tu Cuenta"
          />

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
            }) => (
              <>
                <Layout style={{marginTop: height * 0.02}}>
                  <Input
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    size="large"
                    status={errors.email && touched.email ? 'danger' : 'basic'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    caption={ErrorFieldForm(errors, touched, 'email')}
                    accessoryLeft={
                      <MyIcon name="email-outline" width={20} height={20} />
                    }
                    disabled={isLoading}
                    style={{marginBottom: 20}}
                  />

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
                    style={{marginBottom: 20}}
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
                    style={{marginBottom: 20}}
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
                    caption={ErrorFieldForm(errors, touched, 'identification')}
                    accessoryLeft={
                      <MyIcon
                        name="credit-card-outline"
                        width={20}
                        height={20}
                      />
                    }
                    disabled={isLoading}
                    style={{marginBottom: 20}}
                  />

                  <InputPassword
                    secureTextEntry={secureTextEntry}
                    errors={errors}
                    touched={touched}
                    values={values}
                    isLoading={isLoading}
                    placeholder="Contraseña"
                    field="password"
                    toggleSecureEntry={toggleSecureEntry}
                    handleChange={handleChange('password')}
                    handleBlur={handleBlur('password')}
                  />
                </Layout>

                {/* Botón de Crear Cuenta */}
                <Layout
                  style={{
                    alignItems: 'center',
                    marginTop: height * 0.03,
                  }}>
                  <ButtonLoading
                    label="Crear Cuenta"
                    isValid={isValid}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                  />
                </Layout>
              </>
            )}
          </Formik>

          {/* Enlace para iniciar sesión */}
          <Layout
            style={{
              marginVertical: height * 0.02,
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
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModalScreen}
        modalInfo={modalInfo}
      />
    </>
  );
};
