import {Dimensions, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopAuthNavigation} from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
        {/* Imagen */}
        <Layout
          style={{alignItems: 'center', marginVertical: screenHeight * 0.01}}>
          <Image
            source={require('../../../assets/images/not-found.png')}
            style={{width: '100%', height: 300, resizeMode: 'contain'}}
          />
        </Layout>

        {/* Mensaje */}
        <Layout
          style={{alignItems: 'center', marginVertical: screenHeight * 0.01}}>
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
            style={{textAlign: 'center', fontSize: 16, paddingHorizontal: 20}}>
            Lo sentimos, no se encontraron resultados para generar certificados
            de calificaciones. Contacte a soporte para más información.
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
