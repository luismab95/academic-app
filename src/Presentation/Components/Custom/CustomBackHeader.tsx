import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomHeaderStylesBack} from '../../Styles';
import {RootStackParams} from '../../Navigation';

interface CustomBackHeaderProps {
  children: React.ReactNode;
  coursesData?: {category: string};
}

export const CustomBackHeader: React.FC<CustomBackHeaderProps> = ({
  children,
  coursesData,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );

  const authRoutes = [
    'VerifyForgotPasswordMfa',
    'ResetPassword',
    'ForgotPassword',
  ];

  const handleBack = () => {
    if (authRoutes.includes(currentRouteName)) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={CustomHeaderStylesBack.container}>
      <TouchableOpacity
        style={CustomHeaderStylesBack.backIconWrapper}
        onPress={() => handleBack()}>
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
