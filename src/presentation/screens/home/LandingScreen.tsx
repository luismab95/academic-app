import {useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {LoadingIndicator, ModalApp, PropsMessageModal} from '../../components';
import {createDevice, errorStore, ModalHook} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'LandingScreen'> {}

export const LandingScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

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

    navigation.navigate('SignUpScreen');
  };

  return (
    <>
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          {/* Imagen */}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: '100%', height: 300}}
              source={require('../../../assets/images/landing.png')}
              resizeMode="contain"
            />
          </View>

          {/* Inputs */}
          <Layout style={{marginTop: height * 0.04}}>
            <Text
              category="h1"
              style={{
                textAlign: 'center',
                marginBottom: 30,
                fontWeight: 'light',
              }}>
              ¡Obtén tus certificados de calificaciones de forma segura ahora
              mismo!
            </Text>
          </Layout>

          {/* Button */}
          <Layout style={{alignItems: 'center', marginVertical: height * 0.04}}>
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
