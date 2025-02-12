import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopAuthNavigation} from '../../components';
import {Image, useWindowDimensions} from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const {height} = useWindowDimensions();

  return (
    <>
      <TopAuthNavigation onPressProfile={onPressProfile} />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
              paddingHorizontal: 40,
            }}>
            <Image
              source={require('../../../assets/images/not-found.png')}
            />
          </Layout>

          <Layout style={{marginTop: 10}}>
            <Text
              category="h4"
              style={{textAlign: 'center', fontSize: 26, marginBottom: 30}}>
              Lo Sentimos
            </Text>

            <Text
              category="p1"
              style={{
                textAlign: 'center',
                fontSize: 16,
                marginBottom: 30,
                paddingHorizontal: 20,
              }}>
              Lo sentimos, no se encontraron resultados para generar
              certificados de calificaciones, contacte a soporte para más
              información.
            </Text>
          </Layout>
        </ScrollView>
      </Layout>
    </>
  );
};
