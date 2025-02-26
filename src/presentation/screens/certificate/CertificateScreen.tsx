import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {
  LoadingIndicator,
  LoadingView,
  ModalApp,
  PropsMessageModal,
  TopNavigationApp,
} from '../../components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {servicesContainer} from '../../providers/service.provider';
import {errorStore, ModalHook} from '../../../shared';

interface Props
  extends StackScreenProps<RootStackParams, 'CertificateScreen'> {}

export const CertificateScreen = ({navigation, route}: Props) => {
  const {identification, studentId} = route.params;
  const {height, width} = useWindowDimensions();

  const [source, setSource] = useState({
    uri: '',
    cache: true,
  });
  const [isGetAcademicRecord, setIsGetAcademicRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {visibleModal, modalInfo, loadModalInfo, onCloseModal} = ModalHook();

  const onCloseModalScreen = () => {
    if (modalInfo.type === 'success') {
      navigation.goBack();
    }
    onCloseModal();
  };

  const downloadPDF = async () => {
    setIsLoading(true);

    const response = await servicesContainer.academic.getAcademicRecordPDF(
      studentId,
      identification,
    );

    if (response === null) {
      loadModalInfo({
        title: 'Error',
        content: errorStore.getState().message,
        type: 'danger',
      } as PropsMessageModal);
      setIsLoading(false);
      return;
    }

    loadModalInfo({
      title: 'Exito',
      content: response.data,
      type: 'success',
    } as PropsMessageModal);
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
        loadModalInfo({
          title: 'Error',
          content: errorStore.getState().message,
          type: 'danger',
        } as PropsMessageModal);
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
        <LoadingView />
      ) : (
        <Layout style={{flex: 1, marginTop: height * 0}}>
          {/* PDF */}
          <Layout
            style={{
              width,
              height,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Pdf
              source={source}
              style={{width, height, backgroundColor: 'transparent'}}
            />
          </Layout>

          {/* BOTON */}
          <Card style={{position: 'absolute', bottom: 0, padding: 20, width}}>
            <Button
              disabled={isLoading}
              onPress={() => downloadPDF()}
              style={{borderRadius: 50, width: '100%'}}>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                evaProps => (
                  <Text
                    {...evaProps}
                    style={{fontSize: 20, color: 'white'}}
                    category="label">
                    Solicitar
                  </Text>
                )
              )}
            </Button>
          </Card>
        </Layout>
      )}

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModalScreen}
        modalInfo={modalInfo}
      />
    </>
  );
};
