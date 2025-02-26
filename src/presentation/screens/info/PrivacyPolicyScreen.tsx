import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {useState} from 'react';

interface Props
  extends StackScreenProps<RootStackParams, 'PrivacyPolicyScreen'> {}

export const PrivacyPolicyScreen = ({navigation}: Props) => {
  const [date] = useState(new Date());
  const {width} = useWindowDimensions();

  return (
    <>
      <TopNavigationApp title="Pólitica de Privacidad" />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          <Text style={styles.date}>
            Última actualización: {date.toLocaleDateString()}
          </Text>

          <View style={styles.section}>
            <Text style={styles.text}>
              Nos tomamos muy en serio la privacidad de nuestros usuarios. Esta
              política de privacidad describe cómo recopilamos, utilizamos y
              protegemos la información que nos proporcionas al utilizar nuestra
              aplicación.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              1. Información que recopilamos
            </Text>
            <Text style={styles.text}>
              Recopilamos la siguiente información para ofrecerte nuestros
              servicios de manera efectiva:
            </Text>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                <Text style={{fontWeight: '700'}}>Información personal:</Text>{' '}
                Nombres, apellidos, identificación, dirección de correo
                electrónico, información de autenticación (como números de
                teléfono o códigos de autenticación MFA).
              </Text>
            </View>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                <Text style={{fontWeight: '700'}}>Datos de uso:</Text>{' '}
                Información sobre cómo interactúas con nuestra aplicación, como
                datos de inicio de sesión, IP y ubicación.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Uso de la información</Text>
            <Text style={styles.text}>
              Utilizamos la información recopilada para:
            </Text>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                Proporcionar y mantener nuestros servicios.
              </Text>
            </View>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                Autenticar y verificar tu identidad de manera segura mediante
                Multi-Factor Authentication (MFA).
              </Text>
            </View>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                Generar y administrar certificados académicos.
              </Text>
            </View>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                Mejorar y personalizar la experiencia del usuario.
              </Text>
            </View>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                Cumplir con requisitos legales y normativos.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Cifrado y seguridad</Text>
            <Text style={styles.text}>
              Para proteger tus datos personales, utilizamos cifrado de extremo
              a extremo en todas las comunicaciones entre el cliente y el
              servidor. Implementamos medidas de seguridad para prevenir el
              acceso no autorizado a la información que recopilamos.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Compartir información</Text>
            <Text style={styles.text}>
              No compartimos tu información personal con terceros, excepto en
              los siguientes casos:
            </Text>
            <View style={styles.textListContainer}>
              <Text style={styles.textList}>
                <Text style={{fontWeight: '700'}}>Cumplimiento legal:</Text> Si
                estamos obligados por ley a divulgar tu información, lo haremos
                de acuerdo con las normativas aplicables.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Tus derechos</Text>
            <Text style={styles.text}>
              Tienes derecho a acceder, corregir o eliminar tu información
              personal en cualquier momento. Si deseas ejercer estos derechos,
              por favor contáctanos a través de soporte@info.com.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Cambios a esta política</Text>
            <Text style={styles.text}>
              Nos reservamos el derecho de actualizar esta política de
              privacidad. Te notificaremos sobre cualquier cambio importante
              mediante un aviso en nuestra aplicación o por correo electrónico.
              Te recomendamos que revises esta política periódicamente para
              estar al tanto de cualquier modificación.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Contacto</Text>
            <Text style={styles.text}>
              Si tienes alguna pregunta sobre esta política de privacidad o
              sobre cómo gestionamos tu información, por favor contacta a
              nuestro equipo de soporte en soporte@info.com.
            </Text>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
  textList: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 5,
    marginLeft: 20,
  },
  textListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 10,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
