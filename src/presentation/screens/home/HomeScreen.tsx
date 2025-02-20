import {Dimensions, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {CertificateCard, TopAuthNavigation} from '../../components';
import {useState} from 'react';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [info, setInfo] = useState<
    {id: number; name: string; grade: string; year: string}[]
  >([
    {
      id: 1,
      name: 'Universidad de Guayaquil',
      grade: 'Máster en Ciberseguridad',
      year: '2024 - 2025',
    },
    {
      id: 2,
      name: 'Escuela Superior Politécnica de Chimborazo',
      grade: 'Ingeniero en Sistemas Informáticos',
      year: '2013 - 2019',
    },
  ]);

  const onPressCertificate = (certificateId: number) => {
    navigation.navigate('CertificateScreen', {certificateId});
  };

  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <Layout style={{flex: 1}}>
      <TopAuthNavigation onPressProfile={onPressProfile} />

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
        {/* Imagen */}
      </ScrollView>
    </Layout>
  );
};
