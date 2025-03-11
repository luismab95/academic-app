import {useEffect, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {Toast, ToastProvider} from 'react-native-toast-notifications';
import {AppNavigation} from './Presentation/Navigation';
import {AlertError, AnimatedLoading} from './Presentation/Components';
import {StorageAdapter} from './Infrastructure';
import {authStore, errorStore, servicesContainer, validHash} from './Shared';

export default function App(): React.JSX.Element {
  const {logout} = authStore();
  const [loading, setLoading] = useState<boolean>(true);
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        await logout!();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const getPublicKey = async () => {
      setLoading(true);
      const response = await servicesContainer.auth.getPublicKey();

      if (response === null) {
        Toast.show(<AlertError />, {
          type: 'danger',
          placement: 'center',
          duration: 4000,
          animationType: 'zoom-in',
          dangerColor: 'transparent',
        });
        await StorageAdapter.removeItem('publicKey-server');
        setLoading(false);
        return;
      }

      if (!validHash(response.data.publicKey, response.data.sha256Hash)) {
        errorStore.setState({message: 'No se pudo verificar la llave pública'});
        Toast.show(<AlertError />, {
          type: 'danger',
          placement: 'center',
          duration: 4000,
          animationType: 'zoom-in',
          dangerColor: 'transparent',
        });
        setLoading(false);
        return;
      }
      await StorageAdapter.setItem('publicKey-server', response.data.publicKey);
      setLoading(false);
    };
   
    setTimeout(() => {
      getPublicKey();
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <AnimatedLoading />
      ) : (
        <>
          <StatusBar backgroundColor={'#E5ECF9'} barStyle="dark-content" />
          <ToastProvider
            style={{
              width,
              height,
              backgroundColor: 'rgba(255, 255, 255, 0)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppNavigation />
          </ToastProvider>
        </>
      )}
    </>
  );
}
