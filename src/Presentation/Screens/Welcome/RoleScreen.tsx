import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {SigninScreenStyles, WelcomeScreenStyles} from '../../Styles';

export const RoleScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleRoleSelection = (role: string) => {
    navigation.navigate(role === 'verifier' ? 'CertificateValidate' : 'Login');
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={WelcomeScreenStyles.container}>
      <ScrollView>
        <Image
          style={SigninScreenStyles.signInImage}
          source={require('./../../../../assets/Images/Welcome/role.webp')}
        />
        <Text
          style={[
            SigninScreenStyles.welcomeText,
            {fontFamily: 'Raleway-Bold'},
          ]}>
          Certificados Académicos
        </Text>
        <Text
          style={[
            SigninScreenStyles.learningText,
            {fontFamily: 'Nunito-Regular'},
          ]}>
          Selecciona tu función
        </Text>

        <View style={WelcomeScreenStyles.containerRole}>
          <View style={WelcomeScreenStyles.cardsContainer}>
            <TouchableOpacity
              style={[
                WelcomeScreenStyles.card,
                WelcomeScreenStyles.studentCard,
              ]}
              onPress={() => handleRoleSelection('student')}>
              <View style={WelcomeScreenStyles.cardHeader}>
                <Text style={WelcomeScreenStyles.cardTitle}>Estudiante</Text>
              </View>
              <Text style={WelcomeScreenStyles.cardDescription}>
                Solicita tu certificado académico digital de forma rápida y
                segura.
              </Text>
              <Text style={WelcomeScreenStyles.cardActionText}>
                Obtener certificado →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                WelcomeScreenStyles.card,
                WelcomeScreenStyles.verifierCard,
              ]}
              onPress={() => handleRoleSelection('verifier')}>
              <View style={WelcomeScreenStyles.cardHeader}>
                <Text style={WelcomeScreenStyles.cardTitle}>Verificador</Text>
              </View>
              <Text style={WelcomeScreenStyles.cardDescription}>
                Valida la autenticidad de certificados académicos mediante
                nuestro sistema seguro.
              </Text>
              <Text style={WelcomeScreenStyles.cardActionText}>
                Validar certificado →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
