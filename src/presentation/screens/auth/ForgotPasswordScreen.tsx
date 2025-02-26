import {useCallback, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Layout} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  ForgotPasswordForm,
  ModalApp,
  PropsMessageModal,
  TopNavigationApp,
} from '../../components';
import {otpMethod} from '../../../domian';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, ModalHook} from '../../../shared';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onForgotPassword = async (contact: string, method: otpMethod) => {
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
            paddingHorizontal: height > 400 ? 40 : 20,
          }}>
          <ForgotPasswordForm
            onForgotPassword={onForgotPassword}
            isLoading={isLoading}
          />
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModal}
        modalInfo={modalInfo}
      />
    </>
  );
};
