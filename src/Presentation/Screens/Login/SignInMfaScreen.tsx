import {useEffect} from 'react';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {UpdatePasswordHook} from '../../../Shared';
import { AlertError } from '../../Components';

interface Props {
  navigation: NavigationProp<RootStackParams, 'SignInMfa'>;
}

export const SignInMfaScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {message, email} = route.params as {message: string; email: string};

  useEffect(() => {
    setMessage(message);
  }, []);

  const {verifyMfaRender, setMessage, modal, setModal} = UpdatePasswordHook({
    method: 'email',
    type: 'login',
    contact: email,
  });

  return (
    <>
      {verifyMfaRender()}
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
    </>
  );
};
