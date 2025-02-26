import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ForgotPasswordForm,
  ModalApp,
  PropsMessageModal,
  ResetPasswordForm,
  TopNavigationApp,
  VerifyOtp,
} from '../../components';
import {otpMethod} from '../../../domian';
import {servicesContainer} from '../../providers/service.provider';
import {authStore, errorStore, ModalHook} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'SecurityScreen'> {}

export const SecurityScreen = ({navigation}: Props) => {
  const {id} = authStore.getState().getPayloadToken!();

  const {width} = useWindowDimensions();
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpInfo, setOtpInfo] = useState<{
    contact: string;
    method: otpMethod;
    otp: string;
  }>({
    contact: '',
    method: 'email',
    otp: '',
  });
  const [message, setMessage] = useState<string>('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.verifyForgotPassword(
      otpInfo.contact,
      otpInfo.method,
      otp,
      'reset-password',
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }

    setOtpInfo(prevState => ({...prevState, otp}));
    setIsLoading(false);
    setVerifyOtp(true);
  };

  const onResendOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      otpInfo.contact,
      otpInfo.method,
      'reset-password',
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const onCloseModalScreen = () => {
    if (modalInfo.type === 'success') navigation.goBack();
    onCloseModal();
  };

  const onForgotPassword = async (contact: string, method: otpMethod) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      contact,
      method,
      'reset-password',
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }

    setOtpInfo({
      contact,
      method,
      otp: '',
    });
    setMessage(response.data);
    setIsLoading(false);
    setForgotPassword(true);
  };

  const onResetPassword = async (password: string) => {
    setIsLoading(true);
    const response = await servicesContainer.user.updatePassword(
      password,
      otpInfo.otp,
      otpInfo.method,
      id!,
      'reset-password',
    );

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
    setIsLoading(false);
  };

  const renderForm = () => {
    if (forgotPassword) {
      return verifyOtp ? (
        <ResetPasswordForm
          isLoading={isLoading}
          onResetPassword={onResetPassword}
        />
      ) : (
        <VerifyOtp
          message={message}
          isLoading={isLoading}
          onVerifyOtp={onVerifyOtp}
          onResendOtp={onResendOtp}
        />
      );
    }

    return (
      <ForgotPasswordForm
        isLoading={isLoading}
        onForgotPassword={onForgotPassword}
      />
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <TopNavigationApp title="Seguridad" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: width > 400 ? 40 : 20,
        }}>
        {renderForm()}
      </ScrollView>

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModalScreen}
        modalInfo={modalInfo}
      />
    </Layout>
  );
};
