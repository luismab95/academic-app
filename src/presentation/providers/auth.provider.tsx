import {PropsWithChildren, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';
import {authStore} from '../../shared/store/auth.store';
import {AuthSession} from '../../domian/entittes/auth';
import {StorageAdapter} from '../../infrastructure/adapters/storage';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {checkStatus, login} = authStore();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await StorageAdapter.getItem('session');
      if (session !== null) {
        const authSession = JSON.parse(session) as AuthSession;
        await login!(authSession);
      }
      const status = checkStatus!();

      setIsAuth(status);
    };

    fetchSession();
  }, [checkStatus!()]);

  useEffect(() => {
    if (isAuth) {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoadingScreen'}],
      });
    }
  }, [isAuth]);

  return <>{children}</>;
};
