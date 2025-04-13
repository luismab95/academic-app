import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {Formik} from 'formik';
import {CustomBackHeader, CustomErrorInput} from '../../Components';
import {
  CertificatesStyles,
  SigninScreenStyles,
  WelcomeScreenStyles,
} from '../../Styles';
import {
  base64ToTempFile,
  errorStore,
  servicesContainer,
  sharePdf,
  ValidateCertificateSchema,
} from '../../../Shared';

export const CertificateDownloadScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationState, setValidationState] = useState({
    validateCode: true,
    noInfo: false,
    certificate: false,
  });
  const [source, setSource] = useState<{uri: string; cache: boolean}>({
    uri: '',
    cache: true,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValidationState({
          noInfo: false,
          validateCode: true,
          certificate: false,
        });
      };
    }, []),
  );

  const noInfoRender = () => {
    return (
      <View style={WelcomeScreenStyles.container}>
        <View style={WelcomeScreenStyles.wrapper}>
          <Image
            source={require('./../../../../assets/Images/Certificate/certificate-not-found.webp')}
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
      <>
        <View style={CertificatesStyles.pdfContainer}>
          <Pdf source={source} style={[CertificatesStyles.pdf]} />
        </View>
      </>
    );
  };

  const formRender = () => {
    return (
      <>
        <Image
          style={SigninScreenStyles.signInImage}
          source={require('./../../../../assets/Images/Certificate/certificate.webp')}
        />
        <Text
          style={[
            SigninScreenStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          ¿Listo para obtener tu certificado?
        </Text>
        <Text
          style={[
            SigninScreenStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          Ingresa el código de verificación que recibiste por correo
          electrónico.
        </Text>

        <View style={SigninScreenStyles.inputContainer}>
          <Formik
            initialValues={{code: ''}}
            validationSchema={ValidateCertificateSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) =>
              handleValidateCode(values, resetForm)
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <>
                <View>
                  <TextInput
                    placeholder="Código de verificaciòn"
                    style={SigninScreenStyles.input}
                    keyboardType="default"
                    value={values.code}
                    readOnly={isLoading}
                    onBlur={handleBlur('code')}
                    onChangeText={handleChange('code')}
                  />
                  <FontAwesomeIcon
                    style={SigninScreenStyles.icon}
                    icon={faKey}
                    size={20}
                    color={'#A1A1A1'}
                  />
                  <CustomErrorInput
                    errors={errors}
                    touched={touched}
                    field="code"
                  />
                </View>

                <TouchableOpacity
                  style={SigninScreenStyles.buttonContainer}
                  disabled={!isValid || isLoading}
                  onPress={() => handleSubmit()}>
                  {isLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text
                      style={[
                        SigninScreenStyles.buttonText,
                        {fontFamily: 'Raleway-Bold'},
                      ]}>
                      Obtener
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </>
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

  const handleRetry = () => {
    setValidationState({
      validateCode: true,
      noInfo: false,
      certificate: false,
    });
  };

  const handleValidateCode = async (values: any, resetForm: () => void) => {
    setIsLoading(true);

    const response = await servicesContainer.certificate.getCertificate(
      values.code,
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

    resetForm();
    setValidationState({
      noInfo: false,
      validateCode: false,
      certificate: true,
    });
    setSource(prev => ({
      ...prev,
      uri: `data:application/pdf;base64,${response.data}`,
    }));
    setIsLoading(false);
  };

  const handleDownloadPdf = async () => {
    const filePath = await base64ToTempFile(source.uri, 'certificado_temp.pdf');
    await sharePdf(filePath);
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={CertificatesStyles.container}>
      <CustomBackHeader>Obtener Certificado</CustomBackHeader>
      <ScrollView>{renderContent()}</ScrollView>
      {validationState.certificate && (
        <View style={CertificatesStyles.enrollContainer}>
          <TouchableOpacity
            disabled={isLoading}
            style={[CertificatesStyles.enrollButtonWrap]}
            onPress={() => handleDownloadPdf()}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={[
                  CertificatesStyles.enrollText,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                Descargar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};
