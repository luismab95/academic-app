import {Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {TopAuthNavigation} from '../../components/ui/TopAuthNavigation';
import {BottomNavigationApp} from '../../components/ui/BottomNavigation';

export const HomeScreen = () => {
  return (
    <>
      <TopAuthNavigation />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}></ScrollView>
      </Layout>
      <BottomNavigationApp />
    </>
  );
};
