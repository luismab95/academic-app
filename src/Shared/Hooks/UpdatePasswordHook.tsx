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
import {servicesContainer} from '../Providers/ServicesProvider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faKeyboard,
} from '@fortawesome/free-regular-svg-icons';
import {Formik} from 'formik';
import {otpMethod, otpType} from '../../Domian';
import {
  CustomBackHeader,
  CustomErrorInput,
  CustomOptInput,
} from '../../Presentation/Components';
import {ResetPasswordSchema} from '../Validators/AuthValidator';
import {
  ForgotPasswordStyles,
  SettingsScreenStyles,
  SigninScreenStyles,
} from '../../Presentation/Styles';
import {authStore} from '../Store/AuthStore';
import DeviceInfo from 'react-native-device-info';

interface Props {
  method: otpMethod;
  type: otpType;
  userId?: number;
  contact?: string;
}

export const UpdatePasswordHook = ({method, type, userId, contact}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidOtp, setIsValidOtp] = useState<boolean>(false);
  const [resetOtp, setResetOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [id, setId] = useState<number>();
  const [sendOtp, setSendOtp] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(300);
  const [message, setMessage] = useState<string>('');
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState<boolean>(false);
  const [modal, setModal] = useState<{
    success: boolean;
    error: boolean;
    message: string;
  }>({
    success: false,
    error: false,
    message: '',
  });
  const {login} = authStore();

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

  const onGetOtp = (otp: string) => {
    setOtp(otp);
  };

  const onSetValidOtp = (isValid: boolean) => {
    setIsValidOtp(isValid);
  };

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);

    const response = await servicesContainer.auth.verifyForgotPassword(
      contact!,
      method,
      otp,
      type,
    );

    if (response === null) {
      setModal({success: false, error: true, message: ''});
      setIsLoading(false);
      return;
    }
    setUpdatePassword(true);
    setIsLoading(false);
    setId(response.data.userId);
  };

  const onVerifySignInOtp = async (otp: string) => {
    setIsLoading(true);

    const deviceId = await DeviceInfo.getUniqueId();
    const response = await servicesContainer.auth.signInMfa(
      contact!,
      method,
      otp,
      deviceId,
    );

    if (response === null) {
      setModal({success: false, error: true, message: ''});
      setIsLoading(false);
      return;
    }
    await login!(response.data);
  };

  const setVerifyService = async (otp: string) => {
    if (type === 'login') {
      await onVerifySignInOtp(otp);
      return;
    }
    await onVerifyOtp(otp);
  };

  const onResendOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      contact!,
      method,
      type,
    );

    if (response === null) {
      setModal({success: false, error: true, message: ''});
      setIsLoading(false);
      return;
    }
    setResetOtp(prev => !prev);
    setSeconds(300);
    setSendOtp(false);
    setIsLoading(false);
  };

  const handleOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      contact!,
      method,
      type,
    );

    if (response === null) {
      setModal({success: false, error: true, message: ''});
      setIsLoading(false);
      return;
    }
    setMessage(response.data);
    setIsLoading(false);
  };

  const handleResetPassword = async (
    values: {password: string},
    resetForm: () => void,
  ) => {
    setIsLoading(true);
    const response = await servicesContainer.user.updatePassword(
      values.password,
      otp,
      method,
      userId!,
      type,
    );

    if (response === null) {
      setModal({success: false, error: true, message: ''});
      setIsLoading(false);
      return;
    }
    setModal({success: true, error: false, message: response.data});
    resetForm();
    setIsLoading(false);
  };

  const titleUpdatePasswordRender = () => {
    switch (type) {
      case 'login':
        return 'Inicio de sesión';
      case 'forgot-password':
        return 'Olvidaste tu contraseña';
      default:
        return 'Seguridad';
    }
  };

  const updatePasswordRender = () => {
    return (
      <LinearGradient
        colors={['#E5ECF9', '#F6F7F9']}
        style={ForgotPasswordStyles.container}>
        <CustomBackHeader>{titleUpdatePasswordRender()}</CustomBackHeader>
        <ScrollView>
          <Image
            style={SigninScreenStyles.signInImage}
            source={require('./../../../assets/Images/Forgot_password/reset_password.png')}
          />
          <Text
            style={[
              SigninScreenStyles.welcomeText,
              {fontFamily: 'Raleway-Bold'},
            ]}>
            ¡Crear tu nueva contraseña!
          </Text>
          <Text
            style={[
              SigninScreenStyles.learningText,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            Ingresa una nueva contraseña para tu cuenta
          </Text>
          <View style={SigninScreenStyles.inputContainer}>
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
                      style={SigninScreenStyles.input}
                      placeholder="Nueva contraseña"
                      keyboardType="default"
                      secureTextEntry={!isPasswordVisible}
                      value={values.password}
                      readOnly={isLoading}
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

                  <View>
                    <TextInput
                      style={SigninScreenStyles.input}
                      placeholder="Repite la contraseña"
                      keyboardType="default"
                      secureTextEntry={!isPasswordVisibleConfirm}
                      value={values.confirmPassword}
                      readOnly={isLoading}
                      onBlur={handleBlur('confirmPassword')}
                      onChangeText={handleChange('confirmPassword')}
                    />
                    <TouchableOpacity
                      style={SigninScreenStyles.visibleIcon}
                      onPress={() =>
                        setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm)
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
                      style={SigninScreenStyles.icon}
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
                    disabled={!isValid || isLoading}
                    style={ForgotPasswordStyles.buttonContainer}
                    onPress={() => handleSubmit()}>
                    {isLoading ? (
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
        <CustomBackHeader>{titleUpdatePasswordRender()}</CustomBackHeader>
        <ScrollView>
          <Image
            style={SigninScreenStyles.signInImage}
            source={require('./../../../assets/Images/Sign_in/otp.png')}
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
              isLoading={isLoading}
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
              disabled={isLoading || !isValidOtp}
              onPress={() => setVerifyService(otp)}>
              {isLoading ? (
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

  const templateRender = () => {
    if (updatePassword) return updatePasswordRender();
    return verifyMfaRender();
  };

  return {
    isLoading,
    handleOtp,
    updatePasswordRender,
    verifyMfaRender,
    templateRender,
    setMessage,
    updatePassword,
    otp,
    id,
    setOtp,
    modal,
    setModal,
  };
};
