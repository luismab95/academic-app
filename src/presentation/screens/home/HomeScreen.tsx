import {useEffect, useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  CertificateCard,
  LoadingView,
  ModalApp,
  PropsMessageModal,
  TopAuthNavigation,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {Academic} from '../../../domian';
import {errorStore, ModalHook} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();
  const [info, setInfo] = useState<Academic[]>([]);

  const onPressCertificate = (identification: string, studentId: number) => {
    navigation.navigate('CertificateScreen', {identification, studentId});
  };

  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  useEffect(() => {
    const getAcademic = async () => {
      setIsLoading(true);
      const user = await servicesContainer.user.getUserById();
      if (user === null) {
        loadModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setIsLoading(false);
        return;
      }

      const result = await servicesContainer.academic.getAcademic();

      if (result === null) {
        loadModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setInfo([
        {
          id: result.data.randomStudent,
          name: result.data.university,
          grade: result.data.career,
          year: result.data.year,
          identification: user.data.identification,
        },
      ]);
    };

    getAcademic();
  }, []);

  const noInfoRender = () => {
    return (
      <>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/images/not-found.png')}
            style={{width: '100%', height: 300}}
            resizeMode="contain"
          />
        </View>

        {/* Mensaje */}
        <Layout
          style={{
            alignItems: 'center',
            marginVertical: height * 0.01,
          }}>
          <Text
            category="h2"
            style={{
              textAlign: 'center',
              marginBottom: height * 0.03,
            }}>
            Lo Sentimos
          </Text>

          <Text
            category="p1"
            style={{
              textAlign: 'center',
              paddingHorizontal: width * 0.02,
            }}>
            Lo sentimos, no se encontraron resultados para generar certificados
            de calificaciones. Contacte a soporte para más información.
          </Text>
        </Layout>
      </>
    );
  };

  return (
    <>
      <Layout style={{flex: 1}}>
        <TopAuthNavigation onPressProfile={onPressProfile} />

        {isLoading ? (
          <LoadingView />
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingHorizontal: width > 400 ? 40 : 20,
            }}>
            {info.length === 0 ? (
              noInfoRender()
            ) : (
              <Layout
                style={{
                  flex: 1,
                  marginTop: height * 0.05,
                }}>
                {info.map(item => (
                  <CertificateCard
                    data={item}
                    key={item.id}
                    onPress={onPressCertificate}
                  />
                ))}
              </Layout>
            )}
          </ScrollView>
        )}
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
