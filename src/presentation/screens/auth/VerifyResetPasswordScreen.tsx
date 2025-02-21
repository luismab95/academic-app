import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Modal} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  Message,
  PropsMessageModal,
  VerifyOtp,
  TopNavigationApp,
} from '../../components';
import {errorStore} from '../../../shared';
import {servicesContainer} from '../../providers/service.provider';
import {Dimensions} from 'react-native';

interface Props
  extends StackScreenProps<RootStackParams, 'VerifyResetPasswordScreen'> {}

export const VerifyResetPasswordScreen = ({navigation, route}: Props) => {
  const screenWidth = Dimensions.get('window').width;

  const {message, contact, method} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const onVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    const response = await servicesContainer.auth.verifyForgotPassword(
      contact,
      method,
      otp,
      'forgot-password',
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

  return (
    <>
      <TopNavigationApp title="Olvidaste tu Contraseña" />
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
        animationType="slide">
        <Message
          title={modalInfo.title}
          content={modalInfo.content}
          type={modalInfo.type}
          onContinue={onCloseModal}
        />
      </Modal>
    </>
  );
};
