import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {ForgotPasswordStyles} from '../../Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {AlertError, CustomErrorInput} from '../../Components';
import {Formik} from 'formik';
import {ForgotPasswordSchema, servicesContainer} from '../../../Shared';
import {Toast} from 'react-native-toast-notifications';

interface Props {
  navigation: NavigationProp<RootStackParams, 'ForgotPassword'>;
}
export const ForgotPasswordScreen = ({navigation}: Props) => {
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);

  const handleSignIn = async (
    values: {email: string},
    resetForm: () => void,
  ) => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.auth.forgotPassword(
      values.email,
      'email',
      'forgot-password',
    );

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsButtonSpinner(false);
      return;
    }
    resetForm();
    navigation.navigate('VerifyForgotPasswordMfa', {
      message: response.data,
      contact: values.email,
      method: 'email',
    });
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={ForgotPasswordStyles.container}>
      <ScrollView>
        <Image
          style={ForgotPasswordStyles.image}
          source={require('./../../../../assets/Images/Forgot_password/forgot_password.png')}
        />
        <Text
          style={[
            ForgotPasswordStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          ¡Olvidaste tu contraseña!
        </Text>
        <Text
          style={[
            ForgotPasswordStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          Ingresa el correo electrónico asociado a tu cuenta
        </Text>
        <View style={ForgotPasswordStyles.inputContainer}>
          <Formik
            initialValues={{email: ''}}
            validationSchema={ForgotPasswordSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => handleSignIn(values, resetForm)}>
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
                    style={[
                      ForgotPasswordStyles.input,
                      {fontFamily: 'Nunito-Regular'},
                    ]}
                    placeholder="Correo electrónico"
                    value={values.email}
                    keyboardType="email-address"
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                  />
                  <FontAwesomeIcon
                    style={ForgotPasswordStyles.icon}
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

                <TouchableOpacity
                  disabled={!isValid || isButtonSpinner}
                  style={ForgotPasswordStyles.buttonContainer}
                  onPress={() => handleSubmit()}>
                  {isButtonSpinner ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text
                      style={[
                        ForgotPasswordStyles.buttonText,
                        {fontFamily: 'Raleway-Bold'},
                      ]}>
                      Enviar
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={ForgotPasswordStyles.loginLink}>
            <Text
              style={[
                ForgotPasswordStyles.backText,
                {fontFamily: 'Raleway-SemiBold'},
              ]}>
              ¿Volver a?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  ForgotPasswordStyles.backText,
                  {fontFamily: 'Raleway-SemiBold'},
                  ForgotPasswordStyles.loginText,
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
