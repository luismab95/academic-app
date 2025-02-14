import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Modal} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {Message, PropsMessageModal, VerifyOtp} from '../../components';
import {errorStore} from '../../../shared/store/error.store';
import {servicesContainer} from '../../providers/service.provider';
import {authStore} from '../../../shared/store/auth.store';
import DeviceInfo from 'react-native-device-info';

interface Props extends StackScreenProps<RootStackParams, 'SignInMfaScreen'> {}

export const SignInMfaScreen = ({navigation, route}: Props) => {
  const {message, email} = route.params;
  const [visibleModal, setVisibleModal] = useState(false);
  const {login} = authStore();
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

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
      setModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setVisibleModal(true);
      setIsLoading(false);

      return;
    }
    await login!(response.data);
    navigation.navigate('HomeScreen');
  };

  const onResendOtp = () => {
    //TODO RESEND OPT
    console.log('Resend OPT');
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <>
      <TopNavigationApp title="Verificación MFA" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <VerifyOtp
            isLoading={isLoading}
            message={message}
            onVerifyOtp={onVerifyOtp}
            onResendOtp={onResendOtp}
          />
        </ScrollView>
      </Layout>
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCloseModal}
        visible={visibleModal}
        children={
          <Message
            title={modalInfo.title}
            content={modalInfo.content}
            type={modalInfo.type}
            onContinue={onCloseModal}
          />
        }></Modal>
    </>
  );
};
