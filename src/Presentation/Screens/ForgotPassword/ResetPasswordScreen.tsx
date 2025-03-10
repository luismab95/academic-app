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
import {NavigationProp, useRoute} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {ForgotPasswordStyles} from '../../Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKeyboard,
} from '@fortawesome/free-regular-svg-icons';
import {AlertError, AlertSuccess, CustomErrorInput} from '../../Components';
import {Formik} from 'formik';
import {ResetPasswordSchema, servicesContainer} from '../../../Shared';
import {Toast} from 'react-native-toast-notifications';
import {otpMethod} from '../../../Domian';

interface Props {
  navigation: NavigationProp<RootStackParams, 'ResetPassword'>;
}
export const ResetPasswordScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {method, otp, userId} = route.params as {
    method: otpMethod;
    otp: string;
    userId: number;
  };
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleCofirm] =
    useState<boolean>(false);

  const handleResetPassword = async (
    values: {password: string},
    resetForm: () => void,
  ) => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.user.updatePassword(
      values.password,
      otp,
      method,
      userId,
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
    Toast.show(<AlertSuccess message={response.data} />, {
      type: 'success',
      placement: 'center',
      duration: 4000,
      animationType: 'zoom-in',
      successColor: 'transparent',
      onClose() {
        navigation.navigate('Login');
      },
    });
    resetForm();
    setIsButtonSpinner(false);
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={ForgotPasswordStyles.container}>
      <ScrollView>
        <Image
          style={ForgotPasswordStyles.image}
          source={require('./../../../../assets/Images/Forgot_password/reset_password.png')}
        />
        <Text
          style={[
            ForgotPasswordStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          ¡Crear tu nueva contraseña!
        </Text>
        <Text
          style={[
            ForgotPasswordStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          Ingresa una nueva contraseña para tu cuenta
        </Text>
        <View style={ForgotPasswordStyles.inputContainer}>
          <Formik
            initialValues={{password: '', confirmPassword: ''} as any}
            validationSchema={ResetPasswordSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) =>
              handleResetPassword(values, resetForm)
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
                    style={ForgotPasswordStyles.input}
                    placeholder="Nueva contraseña"
                    keyboardType="default"
                    secureTextEntry={!isPasswordVisible}
                    value={values.password}
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    style={ForgotPasswordStyles.visibleIcon}
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
                    style={ForgotPasswordStyles.icon}
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

                <View>
                  <TextInput
                    style={ForgotPasswordStyles.input}
                    placeholder="Repite la contraseña"
                    keyboardType="default"
                    secureTextEntry={!isPasswordVisibleConfirm}
                    value={values.confirmPassword}
                    readOnly={isButtonSpinner}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                  />
                  <TouchableOpacity
                    style={ForgotPasswordStyles.visibleIcon}
                    onPress={() =>
                      setIsPasswordVisibleCofirm(!isPasswordVisibleConfirm)
                    }>
                    {isPasswordVisibleConfirm ? (
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
                    style={ForgotPasswordStyles.icon}
                    icon={faKeyboard}
                    size={20}
                    color={'#A1A1A1'}
                  />
                  <CustomErrorInput
                    errors={errors}
                    touched={touched}
                    field="confirmPassword"
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
                      Guardar
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
