import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LandingScreen'> {}

export const LandingScreen = ({navigation}: Props) => {
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        {/* Space */}
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            paddingHorizontal: 40,
          }}>
          <Image
            style={{width: 400, height: 400}}
            source={require('../../../assets/images/landing.png')}
          />
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 60}}>
          <Text
            category="s1"
            style={{textAlign: 'center', fontSize: 36, marginBottom: 30}}>
            !Obten tus certificados de calificaciones de forma segura ahora
            mismo!
          </Text>
        </Layout>

        {/* Space */}
        <Layout style={{height: 80}} />

        {/* Button */}
        <Layout>
          <Button
            style={{borderRadius: 40}}
            // disabled={isPosting}
            onPress={() => navigation.navigate('SignInScreen')}>
            {evaProps => (
              <Text
                {...evaProps}
                style={{fontSize: 20, color: 'white'}}
                category="label">
                Empezar
              </Text>
            )}
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={{height: 40}} />
      </ScrollView>
    </Layout>
  );
};
