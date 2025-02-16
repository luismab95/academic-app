import {useState} from 'react';
import {Dimensions, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {LoadingIndicator, Message, PropsMessageModal} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {Device} from '../../../domian';
import {errorStore} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'LandingScreen'> {}

export const LandingScreen = ({navigation}: Props) => {
  const screenHeight = Dimensions.get('window').height;

  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    setVisibleModal(false);
  };

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

    navigation.navigate('SignUpScreen');
  };

  return (
    <>
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 40}}>
          {/* Space */}
          <Layout
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 40,
            }}>
            <Image
              style={{width: '100%', height: 300, resizeMode: 'contain'}}
              source={require('../../../assets/images/landing.png')}
              resizeMode="contain"
            />
          </Layout>

          {/* Inputs */}
          <Layout style={{marginTop: screenHeight * 0.01}}>
            <Text
              category="s1"
              style={{textAlign: 'center', fontSize: 36, marginBottom: 30}}>
              ¡Obtén tus certificados de calificaciones de forma segura ahora
              mismo!
            </Text>
          </Layout>

          {/* Space */}
          <Layout style={{height: screenHeight * 0.05}} />

          {/* Button */}
          <Layout style={{alignItems: 'center'}}>
            <Button
              style={{borderRadius: 50, width: '100%'}}
              disabled={isLoading}
              onPress={() => onCreateDevice()}>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                evaProps => (
                  <Text
                    {...evaProps}
                    style={{
                      fontSize: 20,
                      color: 'white',
                    }}
                    category="label">
                    Empezar
                  </Text>
                )
              )}
            </Button>
          </Layout>

          {/* Space */}
          <Layout style={{marginVertical: screenHeight * 0.05}} />
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCloseModal}
        visible={visibleModal}
        shouldUseContainer={false}
        animationType="slide"
        children={
          <Message
            title={modalInfo.title}
            content={modalInfo.content}
            type={modalInfo.type}
            onContinue={onCloseModal}
          />
        }
      />
    </>
  );
};
