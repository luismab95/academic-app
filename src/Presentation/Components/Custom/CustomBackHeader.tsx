import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomHeaderStylesBack} from '../../Styles';

interface CustomBackHeaderProps {
  children: React.ReactNode;
  coursesData?: {category: string};
}

export const CustomBackHeader: React.FC<CustomBackHeaderProps> = ({
  children,
  coursesData,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={CustomHeaderStylesBack.container}>
      <TouchableOpacity
        style={CustomHeaderStylesBack.backIconWrapper}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color={'black'} />
      </TouchableOpacity>
      {coursesData ? (
        <Text
          style={[CustomHeaderStylesBack.text, {fontFamily: 'Raleway-Bold'}]}>
          {coursesData.category} {children}
        </Text>
      ) : null}
      {!coursesData && (
        <Text
          style={[CustomHeaderStylesBack.text, {fontFamily: 'Raleway-Bold'}]}>
          {children}
        </Text>
      )}
      <TouchableOpacity
        disabled={true}
        style={CustomHeaderStylesBack.backIconWrapper}>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};
