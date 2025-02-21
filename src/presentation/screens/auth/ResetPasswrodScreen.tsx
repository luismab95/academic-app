import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Layout, Modal} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  Message,
  PropsMessageModal,
  ResetPasswordForm,
  TopNavigationApp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared';
import {Dimensions} from 'react-native';

interface Props
  extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> {}

export const ResetPasswordScreen = ({navigation, route}: Props) => {
  const screenWidth = Dimensions.get('window').width;

  const {method, otp, userId} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    if (modalInfo.type === 'success') navigation.navigate('SignInScreen');
    setVisibleModal(false);
  };

  const onResetPassword = async (password: string) => {
    setIsLoading(true);

    const response = await servicesContainer.user.updatePassword(
      password,
      otp,
      method,
      userId,
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

    setModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    setVisibleModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
    }, []),
  );

  return (
    <>
      <TopNavigationApp title="Crear Nueva Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: screenWidth > 400 ? 40 : 20,
          }}
          keyboardShouldPersistTaps="handled">
          <ResetPasswordForm
            isLoading={isLoading}
            onResetPassword={onResetPassword}
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
