import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Modal, Text} from '@ui-kitten/components';
import {
  LoadingIndicator,
  Message,
  PropsMessageModal,
  TopNavigationApp,
} from '../../components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore} from '../../../shared';

interface Props
  extends StackScreenProps<RootStackParams, 'CertificateScreen'> {}

export const CertificateScreen = ({navigation, route}: Props) => {
  const {identification, studentId} = route.params;
  const [source, setSource] = useState({
    uri: '',
    cache: true,
  });
  const [isGetAcademicRecord, setIsGetAcademicRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    if (modalInfo.type === 'success') {
      navigation.goBack();
    }
    setVisibleModal(false);
  };

  const downloadPDF = async () => {
    setIsLoading(true);

    const response = await servicesContainer.academic.getAcademicRecordPDF(
      studentId,
      identification,
    );

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

    setModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
    setVisibleModal(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const getAcademicRecord = async () => {
      setIsGetAcademicRecord(true);
      const result = await servicesContainer.academic.getAcademicRecord(
        identification,
        studentId,
      );

      if (result === null) {
        setModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
        setVisibleModal(true);
        setIsGetAcademicRecord(false);
        return;
      }

      setIsGetAcademicRecord(false);
      setSource({
        uri: `data:application/pdf;base64,${result.data.pdfBase64}`,
        cache: true,
      });
    };

    getAcademicRecord();
  }, []);

  return (
    <>
      <TopNavigationApp title="Obtener Certificado" />
      {isGetAcademicRecord ? (
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingIndicator />
        </Layout>
      ) : (
        <>
          <Layout style={{flex: 1}}>
            <Layout style={{marginTop: 20}}></Layout>
            <Layout style={styles.container}>
              <Pdf source={source} style={styles.pdf} />
            </Layout>
          </Layout>
          <View style={styles.cardContainer}>
            <Button
              disabled={isLoading}
              onPress={() => downloadPDF()}
              style={styles.button}>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                evaProps => (
                  <Text
                    {...evaProps}
                    style={{fontSize: 20, color: 'white'}}
                    category="label">
                    Obtener
                  </Text>
                )
              )}
            </Button>
          </View>
        </>
      )}

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
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.4,
    // backgroundColor: 'transparent',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    width: Dimensions.get('window').width,
  },
  button: {
    borderRadius: 50,
    width: '100%',
  },
});
