import {useCallback, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ModalApp,
  PropsMessageModal,
  ResetPasswordForm,
  TopNavigationApp,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, ModalHook} from '../../../shared';

interface Props
  extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> {}

export const ResetPasswordScreen = ({navigation, route}: Props) => {
  const {method, otp, userId} = route.params;

  const {width} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onCloseModalScreen = () => {
    if (modalInfo.type === 'success') navigation.navigate('SignInScreen');
    onCloseModal();
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
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          <ResetPasswordForm
            isLoading={isLoading}
            onResetPassword={onResetPassword}
          />
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModalScreen}
        modalInfo={modalInfo}
      />
    </>
  );
};
