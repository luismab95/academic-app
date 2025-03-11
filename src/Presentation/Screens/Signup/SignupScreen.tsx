import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Toast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faEye,
  faKeyboard,
  faEyeSlash,
  faUser,
  faIdCard,
} from '@fortawesome/free-regular-svg-icons/';
import {AlertError, AlertSuccess, CustomErrorInput} from '../../Components';
import {User} from '../../../Domian';
import {RegisterScreenStyles} from '../../Styles';
import {servicesContainer, SignUpSchema} from '../../../Shared';
import {RootStackParams} from '../../Navigation';

interface Props {
  navigation: NavigationProp<RootStackParams, 'Register'>;
}

export const SignupScreen = ({navigation}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);

  const handleRegister = async (
    values: Partial<User>,
    resetForm: () => void,
  ) => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.auth.signUp(values as User);

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 4000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsButtonSpinner(false);
      return;
    }

    Toast.show(<AlertSuccess message={response.data} />, {
      type: 'success',
      placement: 'center',
      duration: 4000,
      animationType: 'zoom-in',
      successColor: 'transparent',
      onClose: () => navigation.navigate('Login'),
    });
    resetForm();
    setIsButtonSpinner(false);
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={RegisterScreenStyles.container}>
      <ScrollView>
        <Image
          style={RegisterScreenStyles.signupImage}
          source={require('./../../../../assets/Images/Sign_in/signup.png')}
        />
        <Text
          style={[
            RegisterScreenStyles.getStartedText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          ¡Empecemos!
        </Text>

        <View>
          <Text
            style={[
              RegisterScreenStyles.accountCreateText,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            Crea una cuenta para obtener todas las funciones
          </Text>
        </View>
        <View style={RegisterScreenStyles.inputContainer}>
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
            onSubmit={(values, {resetForm}) =>
              handleRegister(values, resetForm)
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
                    style={RegisterScreenStyles.input}
                    keyboardType="email-address"
                    value={values.email}
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                  />
                  <FontAwesomeIcon
                    style={RegisterScreenStyles.icon}
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
                  <View style={RegisterScreenStyles.inputContainerRow}>
                    <View style={{flex: 1}}>
                      <TextInput
                        style={RegisterScreenStyles.input}
                        keyboardType="name-phone-pad"
                        placeholder="Nombres"
                        value={values.name}
                        readOnly={isButtonSpinner}
                        onBlur={handleBlur('name')}
                        onChangeText={handleChange('name')}
                      />
                      <FontAwesomeIcon
                        style={RegisterScreenStyles.icon}
                        icon={faUser}
                        size={20}
                        color={'#A1A1A1'}
                      />
                    </View>

                    <View style={{flex: 1}}>
                      <TextInput
                        style={RegisterScreenStyles.input2}
                        keyboardType="name-phone-pad"
                        placeholder="Apellidos"
                        value={values.lastname}
                        readOnly={isButtonSpinner}
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
                    style={RegisterScreenStyles.input}
                    keyboardType="numeric"
                    placeholder="Identificación"
                    value={values.identification}
                    maxLength={10}
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('identification')}
                    onChangeText={handleChange('identification')}
                  />
                  <FontAwesomeIcon
                    style={RegisterScreenStyles.icon}
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
                    style={RegisterScreenStyles.input}
                    placeholder="Contraseña"
                    keyboardType="default"
                    secureTextEntry={!isPasswordVisible}
                    value={values.password}
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    style={RegisterScreenStyles.visibleIcon}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        size={23}
                        color={'#747474'}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        size={23}
                        color={'#747474'}
                      />
                    )}
                  </TouchableOpacity>
                  <FontAwesomeIcon
                    style={RegisterScreenStyles.icon}
                    icon={faKeyboard}
                    size={20}
                    color={'#A1A1A1'}
                  />
                  <CustomErrorInput
                    errors={errors}
                    touched={touched}
                    field="password"
                  />
                </View>

                <TouchableOpacity
                  style={RegisterScreenStyles.buttonContainer}
                  disabled={!isValid || isButtonSpinner}
                  onPress={() => handleSubmit()}>
                  {isButtonSpinner ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text
                      style={[
                        RegisterScreenStyles.buttonText,
                        {fontFamily: 'Raleway-Bold'},
                      ]}>
                      Crear cuenta
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={RegisterScreenStyles.signupRedirect}>
            <Text
              style={[
                RegisterScreenStyles.signupTextStyle,
                {fontFamily: 'Raleway-SemiBold'},
              ]}>
              ¿Ya tienes una cuenta?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  RegisterScreenStyles.signupTextStyle,
                  {fontFamily: 'Raleway-SemiBold'},
                  RegisterScreenStyles.signupText,
                ]}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
