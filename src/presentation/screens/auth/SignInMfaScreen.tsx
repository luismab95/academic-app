import {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {PropsMessageModal, TemplateMFa} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, authStore, ModalHook} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'SignInMfaScreen'> {}

export const SignInMfaScreen = ({navigation, route}: Props) => {
  const {message, email} = route.params;
  const {login} = authStore();

  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);

    const deviceId = await DeviceInfo.getUniqueId();
    const response = await servicesContainer.auth.signInMfa(
      email,
      'email',
      otp,
      deviceId,
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
    await login!(response.data);
    navigation.navigate('HomeScreen');
  };

  const onResendOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      email,
      'email',
      'login',
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
      title="Verificación MFA"
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
