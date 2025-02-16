import {useState} from 'react';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Modal} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  Message,
  PropsMessageModal,
  TopNavigationApp,
  VerifyOtp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, authStore} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'SignInMfaScreen'> {}

export const SignInMfaScreen = ({navigation, route}: Props) => {
  const screenWidth = Dimensions.get('window').width;

  const {message, email} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const {login} = authStore();
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

  const onResendOtp = async () => {
    setIsLoading(true);
    const response = await servicesContainer.auth.forgotPassword(
      email,
      'email',
      'login',
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
    setVisibleModal(false);
  };

  return (
    <>
      <TopNavigationApp title="Verificación MFA" />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: screenWidth > 400 ? 40 : 20,
          }}
          keyboardShouldPersistTaps="handled">
          <VerifyOtp
            isLoading={isLoading}
            message={message}
            onVerifyOtp={onVerifyOtp}
            onResendOtp={onResendOtp}
          />
        </ScrollView>
      </Layout>
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
        }
      />
    </>
  );
};
