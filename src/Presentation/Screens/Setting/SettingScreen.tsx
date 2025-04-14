import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {Formik} from 'formik';
import {SettingsScreenStyles} from '../../Styles';
import {
  AlertError,
  AlertSuccess,
  AnimatedLoading,
  CustomBackHeader,
  CustomErrorInput,
} from '../../Components';
import {EditUserSchema, servicesContainer} from '../../../Shared';
import {User} from '../../../Domian';

export const SettingScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    success: boolean;
    error: boolean;
    message: string;
  }>({
    success: false,
    error: false,
    message: '',
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const response = await servicesContainer.user.getUserById();
      if (response === null) {
        setModal({success: false, error: true, message: ''});
        setIsLoading(false);
        return;
      }
      setUser(response.data);
      setIsLoading(false);
    };

    getUser();
  }, []);

  const handleUpdateUser = async (values: User, resetForm: () => void) => {
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
      setModal({success: false, error: true, message: ''});
      setIsLoadingForm(false);
      return;
    }

    setModal({success: true, error: false, message: response.data});
    setIsLoading(false);
    setIsLoadingForm(false);
    resetForm();
  };

  return (
    <>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <LinearGradient
          colors={['#E5ECF9', '#F6F7F9']}
          style={SettingsScreenStyles.mainContainer}>
          <CustomBackHeader>Ajustes</CustomBackHeader>
          <ScrollView>
            <View style={SettingsScreenStyles.container}>
              <View style={SettingsScreenStyles.profileContainer}>
                <Text style={SettingsScreenStyles.profileText}>
                  {user?.name.charAt(0).toUpperCase()}
                  {user?.lastname.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={SettingsScreenStyles.title}>Editar Perfil</Text>
            </View>

            <View style={SettingsScreenStyles.inputContainer}>
              <Formik
                initialValues={{...user} as User}
                validationSchema={EditUserSchema}
                validateOnMount
                onSubmit={(values, {resetForm}) =>
                  handleUpdateUser(values, resetForm)
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
                    <View>
                      <TextInput
                        placeholder="Correo electrónico"
                        style={SettingsScreenStyles.input}
                        keyboardType="email-address"
                        value={values.email}
                        readOnly={true}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                      />
                      <FontAwesomeIcon
                        style={SettingsScreenStyles.icon}
                        icon={faEnvelope}
                        size={20}
                        color={'#A1A1A1'}
                      />
                      <CustomErrorInput
                        errors={errors}
                        touched={touched}
                        field="email"
                      />
                    </View>

                    <View>
                      <View style={SettingsScreenStyles.inputContainerRow}>
                        <View style={{flex: 1}}>
                          <TextInput
                            style={SettingsScreenStyles.input}
                            keyboardType="name-phone-pad"
                            placeholder="Nombres"
                            value={values.name}
                            readOnly={isLoadingForm}
                            onBlur={handleBlur('name')}
                            onChangeText={handleChange('name')}
                          />
                          <FontAwesomeIcon
                            style={SettingsScreenStyles.icon}
                            icon={faUser}
                            size={20}
                            color={'#A1A1A1'}
                          />
                        </View>

                        <View style={{flex: 1}}>
                          <TextInput
                            style={SettingsScreenStyles.input2}
                            keyboardType="name-phone-pad"
                            placeholder="Apellidos"
                            value={values.lastname}
                            readOnly={isLoadingForm}
                            onBlur={handleBlur('lastname')}
                            onChangeText={handleChange('lastname')}
                          />
                        </View>
                      </View>
                      <CustomErrorInput
                        errors={errors}
                        touched={touched}
                        field="name"
                      />
                      <CustomErrorInput
                        errors={errors}
                        touched={touched}
                        field="lastname"
                      />
                    </View>

                    <View>
                      <TextInput
                        style={SettingsScreenStyles.input}
                        keyboardType="numeric"
                        placeholder="Identificación"
                        value={values.identification}
                        maxLength={10}
                        readOnly={true}
                        onBlur={handleBlur('identification')}
                        onChangeText={handleChange('identification')}
                      />
                      <FontAwesomeIcon
                        style={SettingsScreenStyles.icon}
                        icon={faIdCard}
                        size={20}
                        color={'#A1A1A1'}
                      />
                      <CustomErrorInput
                        errors={errors}
                        touched={touched}
                        field="identification"
                      />
                    </View>

                    <View>
                      <TextInput
                        style={SettingsScreenStyles.input}
                        keyboardType="phone-pad"
                        placeholder="Teléfono celular"
                        value={values.phone}
                        readOnly={isLoadingForm}
                        onBlur={handleBlur('phone')}
                        onChangeText={handleChange('phone')}
                      />
                      <FontAwesomeIcon
                        style={SettingsScreenStyles.icon}
                        icon={faPhone}
                        size={20}
                        color={'#A1A1A1'}
                      />
                      <CustomErrorInput
                        errors={errors}
                        touched={touched}
                        field="phone"
                      />
                    </View>

                    <TouchableOpacity
                      style={SettingsScreenStyles.saveButton}
                      disabled={isLoadingForm || !isValid}
                      onPress={() => handleSubmit()}>
                      {isLoadingForm ? (
                        <ActivityIndicator size={'small'} color={'white'} />
                      ) : (
                        <Text
                          style={[
                            SettingsScreenStyles.saveButtonText,
                            {fontFamily: 'Raleway-Bold'},
                          ]}>
                          Actualizar
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </LinearGradient>
      )}

      <AlertError
        show={modal.error}
        onClose={() =>
          setModal({
            error: false,
            success: false,
            message: '',
          })
        }
      />
      <AlertSuccess
        message={modal.message}
        show={modal.success}
        onClose={() => {
          setModal({
            error: false,
            success: false,
            message: '',
          });
        }}
      />
    </>
  );
};
