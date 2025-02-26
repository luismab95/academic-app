import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useNavigationState} from '@react-navigation/native'; // Importamos useNavigation
import {
  Text,
  TextElement,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {MyIcon} from './Icon';

const BackAction = (): React.ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );

  const authRoutes = [
    'VerifyResetPasswordScreen',
    'ResetPasswordScreen',
    'ForgotPasswordScreen',
  ];

  const onIconPress = () => {
    if (authRoutes.includes(currentRouteName)) {
      navigation.reset({
        index: 0,
        routes: [{name: 'SignInScreen'}],
      });
      return;
    }
    navigation.goBack();
  };
  return (
    <TopNavigationAction
      onPress={onIconPress}
      icon={<MyIcon name="arrow-back" />}
    />
  );
};

interface TopNavigationSimpleUsageShowcaseProps {
  title: string;
  leftAction?: boolean;
}

const titleText = (props: any, title: string): TextElement => (
  <Text {...props} style={{fontSize: 24}}>
    {title}
  </Text>
);

export const TopNavigationApp = ({
  title,
  leftAction = true,
}: TopNavigationSimpleUsageShowcaseProps): React.ReactElement => (
  <TopNavigation
    style={{paddingTop: 40, paddingBottom: 20}}
    accessoryLeft={leftAction ? BackAction : undefined}
    title={props => titleText(props, title)}
  />
);
