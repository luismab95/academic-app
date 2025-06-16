import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, StatusBar} from 'react-native';
import {AppNavigation} from './Presentation/Navigation';
import {AnimatedLoading, CustomError} from './Presentation/Components';
import {StorageAdapter} from './Infrastructure';
import {authStore, errorStore, servicesContainer, validHash} from './Shared';

export default function App(): React.JSX.Element {
  const {logout} = authStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [retry, setRetry] = useState<boolean>(false);
  const [errorService, setErrorService] = useState<boolean>(false);

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
    setLoading(true);
    const getPublicKey = async () => {
      setErrorService(false);
      const response = await servicesContainer.auth.getPublicKey();

      if (response === null) {
        setErrorService(true);
        await StorageAdapter.removeItem('publicKey-server');
        setLoading(false);
        return;
      }

      if (!validHash(response.data.publicKey, response.data.sha256Hash)) {
        setErrorService(true);
        errorStore.setState({message: 'No se pudo verificar la llave pública'});
        setLoading(false);
        return;
      }
      await StorageAdapter.setItem('publicKey-server', response.data.publicKey);
      setLoading(false);
    };

    const interval = setTimeout(() => {
      getPublicKey();
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, [retry]);

  const handleRetry = () => {
    setRetry(!retry);
  };

  return (
    <>
      {loading ? (
        <AnimatedLoading />
      ) : (
        <>
          <StatusBar backgroundColor={'#E5ECF9'} barStyle="dark-content" />
          {errorService ? (
            <CustomError loading={loading} handleRetry={handleRetry} />
          ) : (
            <AppNavigation />
          )}
        </>
      )}
    </>
  );
}
