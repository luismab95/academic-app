import {useState} from 'react';
import {Layout, Modal} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ForgotPasswordForm,
  Message,
  PropsMessageModal,
  ResetPasswordForm,
  TopNavigationApp,
  VerifyOtp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {authStore, errorStore} from '../../../shared';
import {otpMethod} from '../../../domian';
import {Dimensions} from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'SecurityScreen'> {}

export const SecurityScreen = ({navigation}: Props) => {
  const screenWidth = Dimensions.get('window').width;

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
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const {id} = authStore.getState().getPayloadToken!();

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.verifyForgotPassword(
      otpInfo.contact,
      otpInfo.method,
      otp,
      'reset-password',
    );

    if (response === null) {
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
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
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const onCloseModal = () => {
    if (modalInfo.type === 'success') navigation.goBack();
    setVisibleModal(false);
  };

  const onForgotPassword = async (contact: string, method: otpMethod) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      contact,
      method,
      'reset-password',
    );

    if (response === null) {
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
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
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
      setIsLoading(false);
      return;
    }

    setModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    setVisibleModal(true);
    setIsLoading(false);
  };

  return (
    <Layout style={{flex: 1}}>
      <TopNavigationApp title="Seguridad" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: screenWidth > 400 ? 40 : 20,
        }}
        keyboardShouldPersistTaps="handled">
        {forgotPassword ? (
          verifyOtp ? (
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
          )
        ) : (
          <ForgotPasswordForm
            isLoading={isLoading}
            onForgotPassword={onForgotPassword}
          />
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCloseModal}
        visible={visibleModal}
        shouldUseContainer={false}
        animationType="slide"
        children={
          <Message
            title={modalInfo.title}
            content={modalInfo.content}
            type={modalInfo.type}
            onContinue={onCloseModal}
          />
        }></Modal>
    </Layout>
  );
};
