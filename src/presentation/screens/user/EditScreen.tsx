import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ErrorFieldForm,
  LoadingIndicator,
  LoadingView,
  ModalApp,
  MyIcon,
  PropsMessageModal,
  TopNavigationApp,
  UserAvatar,
} from '../../components';
import {User} from '../../../domian';
import {servicesContainer} from '../../providers/service.provider';
import {EditUserSchema, errorStore, ModalHook} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'EditScreen'> {}

export const EditScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const response = await servicesContainer.user.getUserById();
      if (response === null) {
        loadModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setIsLoading(false);
        return;
      }
      setUser(response.data);
      setIsLoading(false);
    };

    getUser();
  }, []);

  const onUpdateUser = async (values: User, resetForm: () => void) => {
    setIsLoadingForm(true);
    const response = await servicesContainer.user.updateUser(
      {
        name: values.name,
        lastname: values.lastname,
        identification: values.identification,
        email: values.email,
        phone: values.phone,
      } as User,
      values.id,
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoadingForm(false);

      return;
    }

    loadModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    setIsLoading(false);
    setIsLoadingForm(false);
    resetForm();
  };

  return (
    <Layout style={{flex: 1}}>
      <TopNavigationApp title="Editar Perfil" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: width > 400 ? 40 : 20,
        }}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <>
            {/* Avatar */}
            <UserAvatar />
            <Divider style={{marginVertical: 20}} />

            {/* FORM */}
            <Formik
              initialValues={{...user} as User}
              validationSchema={EditUserSchema}
              validateOnMount
              onSubmit={(values, {resetForm}) =>
                onUpdateUser(values, resetForm)
              }>
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
                  {/* Inputs */}
                  <Layout style={{marginTop: height * 0.02}}>
                    <Input
                      placeholder="Nombres"
                      autoCapitalize="none"
                      status={errors.name && touched.name ? 'danger' : 'basic'}
                      size="large"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      caption={ErrorFieldForm(errors, touched, 'name')}
                      accessoryLeft={
                        <MyIcon name="text-outline" width={20} height={20} />
                      }
                      disabled={isLoadingForm}
                      style={{marginBottom: 20}}
                    />

                    <Input
                      placeholder="Apellidos"
                      autoCapitalize="none"
                      status={
                        errors.lastname && touched.lastname ? 'danger' : 'basic'
                      }
                      size="large"
                      onChangeText={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      value={values.lastname}
                      caption={ErrorFieldForm(errors, touched, 'lastname')}
                      accessoryLeft={
                        <MyIcon name="text-outline" width={20} height={20} />
                      }
                      disabled={isLoadingForm}
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
                      disabled={isLoadingForm}
                      style={{marginBottom: 20}}
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
                      disabled={true}
                      style={{marginBottom: 20}}
                    />

                    <Input
                      placeholder="Telefono"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      size="large"
                      status={
                        errors.phone && touched.phone ? 'danger' : 'basic'
                      }
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      caption={ErrorFieldForm(errors, touched, 'phone')}
                      accessoryLeft={
                        <MyIcon name="phone-outline" width={20} height={20} />
                      }
                      disabled={isLoadingForm}
                      style={{marginBottom: 20}}
                    />
                  </Layout>

                  {/* Update Button */}
                  <Layout style={{marginVertical: height * 0.03}}>
                    <Button
                      style={{borderRadius: 50, width: '100%'}}
                      disabled={isLoadingForm || !isValid}
                      onPress={() => handleSubmit()}>
                      {isLoading ? (
                        <LoadingIndicator />
                      ) : (
                        evaProps => (
                          <Text
                            {...evaProps}
                            style={{
                              fontSize: 20,
                              color: 'white',
                            }}
                            category="label">
                            Actualizar
                          </Text>
                        )
                      )}
                    </Button>
                  </Layout>
                </>
              )}
            </Formik>
          </>
        )}
      </ScrollView>

      {/* Modal */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModal}
        modalInfo={modalInfo}
      />
    </Layout>
  );
};
