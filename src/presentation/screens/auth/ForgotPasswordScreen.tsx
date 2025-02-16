import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Layout, Modal} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ForgotPasswordForm,
  Message,
  PropsMessageModal,
  TopNavigationApp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared';
import {otpMethod} from '../../../domian';
import {Dimensions} from 'react-native';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const screenWidth = Dimensions.get('window').width;

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

  const onForgotPassword = async (contact: string, method: otpMethod) => {
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

    navigation.navigate('VerifyResetPasswordScreen', {
      message: response.data,
      contact,
      method,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
    }, []),
  );

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
          <ForgotPasswordForm
            onForgotPassword={onForgotPassword}
            isLoading={isLoading}
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
        }></Modal>
    </>
  );
};
