import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CertificatesStyles,
  SigninScreenStyles,
  WelcomeScreenStyles,
} from '../../Styles';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {readFile} from 'react-native-fs';
import {Toast} from 'react-native-toast-notifications';
import {AlertError} from '../../Components';
import {errorStore, servicesContainer} from '../../../Shared';
import {faFilePdf, faUpload} from '@fortawesome/free-solid-svg-icons';
import {CertificateData} from '../../../Domian';

export const CertificateValidateScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [certificateData, setCertificateData] = useState<CertificateData>();
  const [base64String, setBase64String] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationState, setValidationState] = useState({
    validateCode: true,
    noInfo: false,
    certificate: false,
  });

  const handleRetry = () => {
    setBase64String('');
    setFilename('');
    setIsValid(false);
    setValidationState({
      validateCode: true,
      noInfo: false,
      certificate: false,
    });
  };

  const pickAndConvertPdf = async () => {
    if (isLoading) return;
    try {
      setFilename('');
      setIsValid(false);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFilename(res[0].name || 'PDF');
      //todo ver porque cambioa el base64
      const fileContent = await readFile(res[0].uri, 'base64');
      console.log(fileContent);
      
      setBase64String(fileContent);
      setIsValid(true);
    } catch (err) {
      errorStore.setState({
        message: 'No se pudo cargar el documento, vuelva a intentarlo.',
      });
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 5000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
    }
  };

  const handleValidate = async () => {
    setIsLoading(true);

    const response = await servicesContainer.certificate.validateCertificate(
      base64String,
    );

    if (response === null) {
      setValidationState({
        noInfo: true,
        validateCode: false,
        certificate: false,
      });
      setErrorMessage(errorStore.getState().message);
      setIsLoading(false);
      return;
    }

    setCertificateData(response.data);
    setValidationState({
      noInfo: false,
      validateCode: false,
      certificate: true,
    });

    setIsLoading(false);
  };

  const formRender = () => {
    return (
      <>
        <Image
          style={SigninScreenStyles.signInImage}
          source={require('./../../../../assets/Images/Certificate/validate.webp')}
        />
        <Text
          style={[
            SigninScreenStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          Valida tu Certificado
        </Text>
        <Text
          style={[
            SigninScreenStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          Valida la autenticidad de certificados académicos mediante nuestro
          sistema seguro.
        </Text>

        <View style={SigninScreenStyles.inputContainer}>
          <View style={CertificatesStyles.inputContainer}>
            <TouchableOpacity
              style={[
                CertificatesStyles.card,
                isValid && CertificatesStyles.loadFile,
              ]}
              onPress={pickAndConvertPdf}
              activeOpacity={0.7}>
              <View style={CertificatesStyles.cardContent}>
                {filename === '' ? (
                  <>
                    <FontAwesomeIcon
                      icon={faUpload}
                      size={40}
                      color={'#3f51b5'}
                    />
                    <Text style={CertificatesStyles.cardTitle}>
                      Seleccionar Certificado
                    </Text>
                    <Text style={CertificatesStyles.cardSubtitle}>
                      Toca aquí para cargar un archivo PDF
                    </Text>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      size={40}
                      color={'#3f51b5'}
                    />
                    <Text style={CertificatesStyles.cardTitle}>{filename}</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={SigninScreenStyles.buttonContainer}
            disabled={!isValid || isLoading}
            onPress={() => handleValidate()}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={[
                  SigninScreenStyles.buttonText,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                Validar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const noInfoRender = () => {
    return (
      <View style={WelcomeScreenStyles.container}>
        <View style={WelcomeScreenStyles.wrapper}>
          <Image
            source={require('./../../../../assets/Images/Certificate/fake.webp')}
            style={SigninScreenStyles.signInImage}
          />
          <Text
            style={[WelcomeScreenStyles.title, {fontFamily: 'Raleway-Bold'}]}>
            Lo Sentimos
          </Text>
          <View style={WelcomeScreenStyles.descriptionContainer}>
            <Text
              style={[
                WelcomeScreenStyles.description,
                {fontFamily: 'Nunito-Regular'},
              ]}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={[WelcomeScreenStyles.buttonContainer, {marginTop: 40}]}
              disabled={isLoading}
              onPress={() => handleRetry()}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text
                  style={[
                    WelcomeScreenStyles.buttonText,
                    {fontFamily: 'Raleway-Bold'},
                  ]}>
                  Reintentar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const certificateRender = () => {
    return (
      <View style={CertificatesStyles.cardDetail}>
        <Image
          source={require('./../../../../assets/Images/Certificate/real.webp')}
          style={SigninScreenStyles.signInImage}
        />

        <Text
          style={[
            SigninScreenStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          Detalle del Certificado
        </Text>

        <Text
          style={[
            SigninScreenStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          El Certificado fue Validado
        </Text>

        <View style={CertificatesStyles.certificateContainer}>
          <View style={CertificatesStyles.infoContainer}>
            <Text style={CertificatesStyles.label}>Certificado:</Text>
            <Text style={[CertificatesStyles.value, CertificatesStyles.code]}>
              {certificateData?.code}
            </Text>
          </View>

          <View style={CertificatesStyles.infoContainer}>
            <Text style={CertificatesStyles.label}>Nombre completo:</Text>
            <Text style={CertificatesStyles.value}>
              {certificateData?.fullname}
            </Text>
          </View>

          <View style={CertificatesStyles.infoContainer}>
            <Text style={CertificatesStyles.label}>Identificación:</Text>
            <Text style={CertificatesStyles.value}>
              {certificateData?.identification}
            </Text>
          </View>

          <View style={CertificatesStyles.infoContainer}>
            <Text style={CertificatesStyles.label}>Email:</Text>
            <Text style={CertificatesStyles.value}>
              {certificateData?.email}
            </Text>
          </View>

          <View style={CertificatesStyles.infoContainer}>
            <Text style={CertificatesStyles.label}>Fecha de creación:</Text>
            <Text style={CertificatesStyles.value}>
              {certificateData?.createdAt}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[WelcomeScreenStyles.buttonContainer, {marginTop: 40}]}
          disabled={isLoading}
          onPress={() => handleRetry()}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text
              style={[
                WelcomeScreenStyles.buttonText,
                {fontFamily: 'Raleway-Bold'},
              ]}>
              Nueva Validación
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    switch (true) {
      case validationState.noInfo:
        return noInfoRender();
      case validationState.certificate:
        return certificateRender();
      default:
        return formRender();
    }
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={CertificatesStyles.container}>
      <ScrollView>{renderContent()}</ScrollView>
    </LinearGradient>
  );
};
