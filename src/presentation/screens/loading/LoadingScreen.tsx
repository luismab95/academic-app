import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Modal, Spinner} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {servicesContainer} from '../../providers/service.provider';
import {Message, PropsMessageModal} from '../../components';
import {errorStore, generateKeys} from '../../../shared';
import {StorageAdapter} from '../../../infrastructure/adapters/storage';
import {Device} from '../../../domian';

interface Props extends StackScreenProps<RootStackParams, 'LoadingScreen'> {}

export const LoadingScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    const getDevice = async () => {
      setIsLoading(true);
      const serie = await DeviceInfo.getUniqueId();
      const response = await servicesContainer.device.getDeviceBySerie(serie);

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
    const device = {
      name: await DeviceInfo.getDeviceName(),
      serie: await DeviceInfo.getUniqueId(),
      type: DeviceInfo.getModel(),
      operationSystem: DeviceInfo.getSystemName(),
      version: DeviceInfo.getSystemVersion(),
    } as Device;

    const response = await servicesContainer.device.createDevice(device);

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
    setIsLoading(false);
  };

  return (
    <>
      <Layout
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width,
          height,
        }}>
        {isLoading && <Spinner size="giant" />}
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
