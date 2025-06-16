import {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {ModalStyles, PrivacyPolicyStyles} from '../../Styles';

interface Props {
  show: boolean;
  onClose: (value: boolean) => void;
}

export const AlertPrivacy = ({show, onClose}: Props) => {
  const [visible, setVisible] = useState(show);
  const [date] = useState(new Date());

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = (value: boolean) => {
    setVisible(false);
    onClose(value);
  };

  const [scrollEndReached, setScrollEndReached] = useState(false);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setScrollEndReached(true);
    }
  };

  return (
    <View style={ModalStyles.container}>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="fade">
        <View style={ModalStyles.backdrop}>
          <View style={ModalStyles.modalContainer}>
            <View style={ModalStyles.modalContent}>
              <TouchableOpacity
                style={ModalStyles.closeIcon}
                onPress={() => handleClose(false)}>
                <FontAwesomeIcon icon={faClose} size={22} color={'#A1A1A1'} />
              </TouchableOpacity>

              <Image
                style={ModalStyles.image}
                source={require('../../../../assets/Images/Sign_in/privacy.jpg')}
              />
              <Text
                style={[
                  ModalStyles.modalTitle,
                  ModalStyles.titleSuccess,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                Acepta nuestra Pólitica de Privacidad y Tratamiento de Datos
                Personales
              </Text>
              <ScrollView
                style={ModalStyles.scrollContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}>
                <View style={PrivacyPolicyStyles.policyContainer}>
                  <Text style={PrivacyPolicyStyles.date}>
                    Última actualización: {date.toLocaleDateString()}
                  </Text>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.text}>
                      Nos tomamos muy en serio la privacidad de nuestros
                      usuarios. Esta política de privacidad describe cómo
                      recopilamos, utilizamos y protegemos la información que
                      nos proporcionas al utilizar nuestra aplicación.
                    </Text>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      1. Información que recopilamos
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Recopilamos la siguiente información para ofrecerte
                      nuestros servicios de manera efectiva:
                    </Text>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        <Text style={{fontWeight: '700'}}>
                          Información personal:
                        </Text>{' '}
                        Nombres, apellidos, identificación, dirección de correo
                        electrónico, información de autenticación (como números
                        de teléfono o códigos de autenticación MFA).
                      </Text>
                    </View>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        <Text style={{fontWeight: '700'}}>Datos de uso:</Text>{' '}
                        Información sobre cómo interactúas con nuestra
                        aplicación, como datos de inicio de sesión, IP y
                        ubicación.
                      </Text>
                    </View>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      2. Uso de la información
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Utilizamos la información recopilada para:
                    </Text>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        Proporcionar y mantener nuestros servicios.
                      </Text>
                    </View>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        Autenticar y verificar tu identidad de manera segura
                        mediante Multi-Factor Authentication (MFA).
                      </Text>
                    </View>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        Generar y administrar certificados académicos.
                      </Text>
                    </View>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        Mejorar y personalizar la experiencia del usuario.
                      </Text>
                    </View>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        Cumplir con requisitos legales y normativos.
                      </Text>
                    </View>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      3. Cifrado y seguridad
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Para proteger tus datos personales, utilizamos cifrado de
                      extremo a extremo en todas las comunicaciones entre el
                      cliente y el servidor. Implementamos medidas de seguridad
                      para prevenir el acceso no autorizado a la información que
                      recopilamos.
                    </Text>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      4. Compartir información
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      No compartimos tu información personal con terceros,
                      excepto en los siguientes casos:
                    </Text>
                    <View style={PrivacyPolicyStyles.textListContainer}>
                      <Text style={PrivacyPolicyStyles.textList}>
                        <Text style={{fontWeight: '700'}}>
                          Cumplimiento legal:
                        </Text>{' '}
                        Si estamos obligados por ley a divulgar tu información,
                        lo haremos de acuerdo con las normativas aplicables.
                      </Text>
                    </View>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      5. Tus derechos
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Tienes derecho a acceder, corregir o eliminar tu
                      información personal en cualquier momento. Si deseas
                      ejercer estos derechos, por favor contáctanos a través de
                      soporte@info.com.
                    </Text>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      6. Cambios a esta política
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Nos reservamos el derecho de actualizar esta política de
                      privacidad. Te notificaremos sobre cualquier cambio
                      importante mediante un aviso en nuestra aplicación o por
                      correo electrónico. Te recomendamos que revises esta
                      política periódicamente para estar al tanto de cualquier
                      modificación.
                    </Text>
                  </View>

                  <View style={PrivacyPolicyStyles.section}>
                    <Text style={PrivacyPolicyStyles.sectionTitle}>
                      7. Contacto
                    </Text>
                    <Text style={PrivacyPolicyStyles.text}>
                      Si tienes alguna pregunta sobre esta política de
                      privacidad o sobre cómo gestionamos tu información, por
                      favor contacta a nuestro equipo de soporte en
                      soporte@info.com.
                    </Text>
                  </View>
                </View>
              </ScrollView>

              <View style={ModalStyles.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    ModalStyles.buttonContainer,
                    !scrollEndReached && ModalStyles.buttonDisabled,
                  ]}
                  disabled={!scrollEndReached}
                  onPress={() => handleClose(true)}>
                  <Text
                    style={[
                      ModalStyles.buttonText,
                      {fontFamily: 'Raleway-Bold'},
                    ]}>
                    Continuar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
