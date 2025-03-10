import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../Styles/CustomHeaderStyles/CustomHeader.styles';

import {ReactNode} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

export const CustomDrawerHeader = ({children}: {children: ReactNode}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconWrapper}
        onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={24} color={'black'} />
      </TouchableOpacity>
      <Text style={[styles.text, {fontFamily: 'Raleway-Bold'}]}>
        {children}
      </Text>
      <TouchableOpacity disabled={true} style={styles.backIconWrapper}>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};
