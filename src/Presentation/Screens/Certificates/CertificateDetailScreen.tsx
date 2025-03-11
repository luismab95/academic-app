import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Toast} from 'react-native-toast-notifications';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AlertError,
  AlertSuccess,
  AnimatedLoading,
  CustomBackHeader,
} from '../../Components';
import {servicesContainer} from '../../../Shared';
import {CertificatesStyles} from '../../Styles';
import {RootStackParams} from '../../Navigation';
import {AcademicRecord, User} from '../../../Domian';

export const CertificateDetailScreen = () => {
  const route = useRoute();
  const {item} = route.params as {item: AcademicRecord};

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonSpinner, setIsButtonSpinner] = useState<boolean>(false);
  const [source, setSource] = useState<{uri: string; cache: boolean}>({
    uri: '',
    cache: true,
  });
  const navigate = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    const getAcademicRecord = async () => {
      const user = await getUser();
      if (user === null) {
        return;
      }
      setIsLoading(true);
      const response = await servicesContainer.academic.getAcademicRecord(
        user.identification,
        item.randomStudent,
        item.universityId,
      );

      if (response === null) {
        Toast.show(<AlertError />, {
          type: 'danger',
          placement: 'center',
          duration: 3000,
          animationType: 'zoom-in',
          dangerColor: 'transparent',
        });
        setIsLoading(false);
        return;
      }
      setSource({
        uri: `data:application/pdf;base64,${response.data.pdfBase64}`,
        cache: true,
      });
      setIsLoading(false);
    };

    getAcademicRecord();
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    const response = await servicesContainer.user.getUserById();
    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsLoading(false);
      return null;
    }
    setUser(response.data);
    setIsLoading(false);
    return response.data;
  };

  const getPdf = async () => {
    setIsButtonSpinner(true);
    const response = await servicesContainer.academic.getAcademicRecordPDF(
      item.universityId,
      item.randomStudent,
      user?.identification!,
    );

    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsButtonSpinner(false);
      return;
    }

    Toast.show(<AlertSuccess message={response.data} />, {
      type: 'success',
      placement: 'center',
      duration: 5000,
      animationType: 'zoom-in',
      successColor: 'transparent',
      onClose: () => {
        navigate.goBack();
      },
    });
    setIsButtonSpinner(false);
  };

  return (
    <>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <LinearGradient
          colors={['#E5ECF9', '#F6F7F9']}
          style={CertificatesStyles.container}>
          <CustomBackHeader>Certificado</CustomBackHeader>
          <ScrollView>
            <View style={CertificatesStyles.pdfContainer}>
              <Pdf source={source} style={[CertificatesStyles.pdf]} />
            </View>
          </ScrollView>
          <View style={CertificatesStyles.enrollContainer}>
            <TouchableOpacity
              disabled={isButtonSpinner}
              style={[CertificatesStyles.enrollButtonWrap]}
              onPress={() => getPdf()}>
              {isButtonSpinner ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text
                  style={[
                    CertificatesStyles.enrollText,
                    {fontFamily: 'Raleway-Bold'},
                  ]}>
                  Solicitar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
};
