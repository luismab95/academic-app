import {useEffect} from 'react';
import {AnimatedLoading} from '../../Components';
import {authStore, UpdatePasswordHook} from '../../../Shared';

export const SecurityScreen = () => {
  const {getPayloadToken} = authStore();
  const user = getPayloadToken ? getPayloadToken() : {};

  const {isLoading, templateRender, handleOtp} = UpdatePasswordHook({
    method: 'email',
    type: 'reset-password',
    userId: Number(user.id),
    contact: user.email!,
  });

  useEffect(() => {
    handleOtp();
  }, []);

  return <>{isLoading ? <AnimatedLoading /> : templateRender()}</>;
};
