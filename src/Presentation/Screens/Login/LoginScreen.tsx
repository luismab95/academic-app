import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faEye,
  faKeyboard,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons/';
import {Formik} from 'formik';
import {servicesContainer, SignInSchema} from '../../../Shared';
import {AlertError, CustomBackHeader, CustomErrorInput} from '../../Components';
import {SigninScreenStyles} from '../../Styles';
import {RootStackParams} from '../../Navigation';

interface Props {
  navigation: NavigationProp<RootStackParams, 'Login'>;
}

interface SignIn {
  email: string;
  password: string;
}

export const LoginScreen = ({navigation}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const handleSignIn = async (values: SignIn, resetForm: () => void) => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.auth.signIn(
      values.email,
      values.password,
    );

    if (response === null) {
      setModal(true);
      setIsButtonSpinner(false);
      return;
    }
    setIsButtonSpinner(false);
    resetForm();

    navigation.navigate('SignInMfa', {
      message: response.data,
      email: values.email,
    });
  };

  return (
    <>
      <LinearGradient
        colors={['#E5ECF9', '#F6F7F9']}
        style={SigninScreenStyles.container}>
        <CustomBackHeader>Iniciar Sesión</CustomBackHeader>
        <ScrollView>
          <Image
            style={SigninScreenStyles.signInImage}
            source={require('./../../../../assets/Images/Sign_in/sign_in.png')}
          />
          <Text
            style={[
              SigninScreenStyles.welcomeText,
              {fontFamily: 'Raleway-Bold'},
            ]}>
            ¡Bienvenido de nuevo!
          </Text>
          <Text
            style={[
              SigninScreenStyles.learningText,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            Inicie Sesión en su Cuenta
          </Text>
          <View style={SigninScreenStyles.inputContainer}>
            <Formik
              initialValues={{email: '', password: ''} as SignIn}
              validationSchema={SignInSchema}
              validateOnMount
              onSubmit={(values, {resetForm}) =>
                handleSignIn(values, resetForm)
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
                      style={SigninScreenStyles.input}
                      keyboardType="email-address"
                      value={values.email}
                      readOnly={isButtonSpinner}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                    />
                    <FontAwesomeIcon
                      style={SigninScreenStyles.icon}
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
                    <TextInput
                      style={SigninScreenStyles.input}
                      placeholder="Contraseña"
                      keyboardType="default"
                      secureTextEntry={!isPasswordVisible}
                      value={values.password}
                      readOnly={isButtonSpinner}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                    />
                    <TouchableOpacity
                      style={SigninScreenStyles.visibleIcon}
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
                      style={SigninScreenStyles.icon}
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
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text
                      style={[
                        SigninScreenStyles.forgotSection,
                        {fontFamily: 'Nunito-SemiBold'},
                      ]}>
                      ¿Has olvidado tu contraseña?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={SigninScreenStyles.buttonContainer}
                    disabled={!isValid || isButtonSpinner}
                    onPress={() => handleSubmit()}>
                    {isButtonSpinner ? (
                      <ActivityIndicator size={'small'} color={'white'} />
                    ) : (
                      <Text
                        style={[
                          SigninScreenStyles.buttonText,
                          {fontFamily: 'Raleway-Bold'},
                        ]}>
                        Iniciar sesión
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={SigninScreenStyles.signupRedirect}>
              <Text
                style={[
                  SigninScreenStyles.signupTextStyle,
                  {fontFamily: 'Raleway-SemiBold'},
                ]}>
                ¿No tienes una cuenta?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={[
                    SigninScreenStyles.signupTextStyle,
                    {fontFamily: 'Raleway-SemiBold'},
                    SigninScreenStyles.signupText,
                  ]}>
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <AlertError show={modal} onClose={() => setModal(false)} />
    </>
  );
};
