import {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout, Modal, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {
  CertificateCard,
  LoadingIndicator,
  Message,
  PropsMessageModal,
  TopAuthNavigation,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);
  const [info, setInfo] = useState<
    {
      id: number;
      name: string;
      grade: string;
      year: string;
      identification: string;
    }[]
  >([]);

  const onPressCertificate = (identification: string, studentId: number) => {
    navigation.navigate('CertificateScreen', {identification, studentId});
  };

  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    const getAcademic = async () => {
      setIsLoading(true);
      const user = await servicesContainer.user.getUserById();
      if (user === null) {
        setModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setVisibleModal(true);
        setIsLoading(false);
        return;
      }

      const result = await servicesContainer.academic.getAcademic();

      if (result === null) {
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

  return (
    <>
      <Layout style={{flex: 1}}>
        <TopAuthNavigation onPressProfile={onPressProfile} />

        {isLoading ? (
          <Layout
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LoadingIndicator />
          </Layout>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingHorizontal: screenWidth > 400 ? 40 : 20,
            }}
            keyboardShouldPersistTaps="handled">
            {info.length === 0 ? (
              <>
                <Layout
                  style={{
                    alignItems: 'center',
                    marginVertical: screenHeight * 0.01,
                  }}>
                  <Image
                    source={require('../../../assets/images/not-found.png')}
                    style={{width: '100%', height: 300, resizeMode: 'contain'}}
                  />
                </Layout>

                {/* Mensaje */}
                <Layout
                  style={{
                    alignItems: 'center',
                    marginVertical: screenHeight * 0.01,
                  }}>
                  <Text
                    category="h4"
                    style={{
                      textAlign: 'center',
                      fontSize: 26,
                      marginBottom: screenHeight * 0.05,
                    }}>
                    Lo Sentimos
                  </Text>

                  <Text
                    category="p1"
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      paddingHorizontal: 20,
                    }}>
                    Lo sentimos, no se encontraron resultados para generar
                    certificados de calificaciones. Contacte a soporte para más
                    información.
                  </Text>
                </Layout>
              </>
            ) : (
              <Layout
                style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  marginTop: screenHeight * 0.1,
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
