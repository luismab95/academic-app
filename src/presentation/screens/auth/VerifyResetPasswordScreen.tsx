import {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {PropsMessageModal, TemplateMFa} from '../../components';
import {errorStore, ModalHook} from '../../../shared';
import {servicesContainer} from '../../providers/service.provider';

interface Props
  extends StackScreenProps<RootStackParams, 'VerifyResetPasswordScreen'> {}

export const VerifyResetPasswordScreen = ({navigation, route}: Props) => {
  const {message, contact, method} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.verifyForgotPassword(
      contact,
      method,
      otp,
      'forgot-password',
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
    navigation.navigate('ResetPasswordScreen', {
      method,
      otp,
      userId: response.data.userId,
    });
  };

  const onResendOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      contact,
      method,
      'forgot-password',
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

  return (
    <TemplateMFa
      title="Olvidaste tu Contraseña"
      isLoading={isLoading}
      message={message}
      visibleModal={visibleModal}
      modalInfo={modalInfo}
      onVerifyOtp={onVerifyOtp}
      onResendOtp={onResendOtp}
      onCloseModal={onCloseModal}
    />
  );
};
