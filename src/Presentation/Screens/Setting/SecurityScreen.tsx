import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AlertError,
  AlertSuccess,
  AnimatedLoading,
  CustomBackHeader,
  CustomErrorInput,
  CustomOptInput,
} from '../../Components';
import {
  ForgotPasswordStyles,
  SettingsScreenStyles,
  SigninScreenStyles,
} from '../../Styles';
import {
  authStore,
  ResetPasswordSchema,
  servicesContainer,
} from '../../../Shared';
import {Toast} from 'react-native-toast-notifications';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faKeyboard,
} from '@fortawesome/free-regular-svg-icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';

export const SecurityScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [isValidOtp, setIsValidOtp] = useState<boolean>(false);
  const [resetOtp, setResetOtp] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleCofirm] =
    useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [sendOtp, setSendOtp] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(300);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};

  useEffect(() => {
    handleOtp();
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setSendOtp(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const onVerifyOtp = async (otp: string) => {
    setIsButtonSpinner(true);

    const response = await servicesContainer.auth.verifyForgotPassword(
      user.email!,
      'email',
      otp,
      'reset-password',
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
    setUpdatePassword(true);
    setIsButtonSpinner(false);
  };

  const handleOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      user.email!,
      'email',
      'reset-password',
    );

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsLoading(false);
      return;
    }
    setMessage(response.data);
    setIsLoading(false);
  };

  const onResendOtp = async () => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.auth.forgotPassword(
      user.email!,
      'email',
      'reset-password',
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
    setResetOtp(prev => !prev);
    setSeconds(300);
    setSendOtp(false);
    setIsButtonSpinner(false);
  };

  const onGetOtp = (otp: string) => {
    setOtp(otp);
  };

  const onSetValidOtp = (isValid: boolean) => {
    setIsValidOtp(isValid);
  };

  const handleResetPassword = async (
    values: {password: string},
    resetForm: () => void,
  ) => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.user.updatePassword(
      values.password,
      otp,
      'email',
      user.id!,
      'reset-password',
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
        navigation.navigate('ProfilePage');
      },
    });
    resetForm();
    setIsButtonSpinner(false);
  };

  const updatePasswordRender = () => {
    return (
      <LinearGradient
        colors={['#E5ECF9', '#F6F7F9']}
        style={ForgotPasswordStyles.container}>
        <CustomBackHeader>Seguridad</CustomBackHeader>
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
    );
  };

  const verifyMfaRender = () => {
    return (
      <LinearGradient
        colors={['#E5ECF9', '#F6F7F9']}
        style={SettingsScreenStyles.mainContainer}>
        <CustomBackHeader>Seguridad</CustomBackHeader>
        <ScrollView>
          <Image
            style={SigninScreenStyles.signInImage}
            source={require('./../../../../assets/Images/Sign_in/otp.png')}
          />
          <Text
            style={[
              SigninScreenStyles.welcomeText,
              {fontFamily: 'Raleway-Bold'},
            ]}>
            ¡Verificación MFA!
          </Text>
          <Text
            style={[
              SigninScreenStyles.learningText,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            {message}
          </Text>
          <View style={SigninScreenStyles.inputContainer}>
            <CustomOptInput
              length={6}
              onComplete={onGetOtp}
              isValid={onSetValidOtp}
              isLoading={isButtonSpinner}
              resetOtp={resetOtp}
            />

            {!sendOtp ? (
              <Text
                style={[
                  SigninScreenStyles.learningText,
                  {fontFamily: 'Nunito-SemiBold'},
                ]}>
                Reenviar código en {seconds} segundos
              </Text>
            ) : (
              <TouchableOpacity onPress={() => onResendOtp()}>
                <Text
                  style={[
                    SigninScreenStyles.resendOtpSection,
                    {fontFamily: 'Nunito-SemiBold'},
                  ]}>
                  Reenviar Código
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={SigninScreenStyles.buttonContainer}
              disabled={isButtonSpinner || !isValidOtp}
              onPress={() => onVerifyOtp(otp)}>
              {isButtonSpinner ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text
                  style={[
                    SigninScreenStyles.buttonText,
                    {fontFamily: 'Raleway-Bold'},
                  ]}>
                  Verificar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  };

  return (
    <>
      {isLoading ? (
        <AnimatedLoading />
      ) : updatePassword ? (
        updatePasswordRender()
      ) : (
        verifyMfaRender()
      )}
    </>
  );
};
