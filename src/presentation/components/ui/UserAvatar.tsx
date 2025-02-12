import {Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {appThemeNavigation} from '../../theme/theme';

export const UserAvatar = () => {
  const {height} = useWindowDimensions();

  return (
    <Layout
      style={{
        alignItems: 'center',
        marginVertical: 20,
        paddingTop: height * 0.02,
      }}>
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appThemeNavigation().colors.primary,
          width: 140,
          height: 140,
          borderRadius: 70,
          marginTop: 4,
        }}>
        <Text
          style={{
            marginHorizontal: 10,
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
          }}>
          LB
        </Text>
      </Layout>

      {/* INFO */}
      <Text category="s1" style={{marginTop: 12}}>
        Luis Manuel Barragán González
      </Text>
      <Text category="s2" style={{marginTop: 8}}>
        luismab95@gmail.com
      </Text>
    </Layout>
  );
};
