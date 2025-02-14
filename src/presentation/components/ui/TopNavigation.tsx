import React from 'react';
import {useNavigation} from '@react-navigation/native'; // Importamos useNavigation
import {Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {MyIcon} from './Icon';

const BackAction = (): React.ReactElement => {
  const navigation = useNavigation();

  const onIconPress = () => {
    navigation.goBack();
  };
  return (
    <TopNavigationAction
      onPress={onIconPress}
      icon={() => <MyIcon name="arrow-back" />}
    />
  );
};

interface TopNavigationSimpleUsageShowcaseProps {
  title: string;
  leftAction?: boolean;
}

export const TopNavigationApp = ({
  title,
  leftAction = true,
}: TopNavigationSimpleUsageShowcaseProps): React.ReactElement => (
  <TopNavigation
    style={{paddingTop: 40}}
    accessoryLeft={leftAction ? BackAction : undefined}
    title={() => (
      <Text style={{fontSize: 24}}>
        {'  '}
        {title}
      </Text>
    )}
  />
);
