import {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AlertError, AlertSuccess, AnimatedLoading} from '../../Components';
import {authStore, UpdatePasswordHook} from '../../../Shared';
import {RootStackParams} from '../../Navigation';

export const SecurityScreen = () => {
  const {getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {isLoading, templateRender, handleOtp, modal, setModal} =
    UpdatePasswordHook({
      method: 'email',
      type: 'reset-password',
      userId: Number(user.id),
      contact: user.email!,
    });

  useEffect(() => {
    handleOtp();
  }, []);

  return (
    <>
      {isLoading ? <AnimatedLoading /> : templateRender()}
      <AlertError
        show={modal.error}
        onClose={() =>
          setModal({
            error: false,
            success: false,
            message: '',
          })
        }
      />
      <AlertSuccess
        message={modal.message}
        show={modal.success}
        onClose={() => {
          setModal({
            error: false,
            success: false,
            message: '',
          });
          navigation.navigate('ProfilePage');
        }}
      />
    </>
  );
};
