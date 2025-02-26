import {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {servicesContainer} from '../../providers/service.provider';
import {LoadingView, ModalApp, PropsMessageModal} from '../../components';
import {createDevice, errorStore, generateKeys} from '../../../shared';
import {StorageAdapter} from '../../../infrastructure/adapters/storage';
import {ModalHook} from '../../../shared/hooks/ModalHook';

interface Props extends StackScreenProps<RootStackParams, 'LoadingScreen'> {}

export const LoadingScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  useEffect(() => {
    const getDevice = async () => {
      setIsLoading(true);
      const serie = await DeviceInfo.getUniqueId();
      const response = await servicesContainer.device.getDeviceBySerie(serie);

      if (response === null) {
        loadModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setIsLoading(false);
        return;
      }

      if (typeof response.data === 'string') {
        navigation.navigate('LandingScreen');
      } else {
        const privateKey = await StorageAdapter.getItem('privateKey');
        const publicKey = await StorageAdapter.getItem('publicKey');
        if (privateKey === null || publicKey === null) {
          await generateKeys();
          await onCreateDevice();
        }
        navigation.navigate('SignInScreen');
      }
    };

    const timer = setTimeout(() => {
      getDevice();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onCreateDevice = async () => {
    setIsLoading(true);

    const response = await createDevice();

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingView />}

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
