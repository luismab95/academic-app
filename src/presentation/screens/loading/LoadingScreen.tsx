import {Layout, Spinner, Text} from '@ui-kitten/components';
import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'LoadingScreen'> {}

export const LoadingScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LandingScreen');
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
      }}>
      <Spinner size="giant" />
      <Text category="s1" style={{fontSize: 20, marginTop: 20}}>
        Cargando...
      </Text>
    </Layout>
  );
};
