import {ReactNode} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {CustomHeaderStyles} from '../../Styles';

export const CustomDrawerHeader = ({children}: {children: ReactNode}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={CustomHeaderStyles.container}>
      <TouchableOpacity
        style={CustomHeaderStyles.backIconWrapper}
        onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={24} color={'black'} />
      </TouchableOpacity>
      <Text style={[CustomHeaderStyles.text, {fontFamily: 'Raleway-Bold'}]}>
        {children}
      </Text>
      <TouchableOpacity
        disabled={true}
        style={CustomHeaderStyles.backIconWrapper}>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};
