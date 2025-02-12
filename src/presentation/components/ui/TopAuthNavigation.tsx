import React from 'react';
import {View} from 'react-native';
import {
  Icon,
  IconElement,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {TouchableWebElement} from '@ui-kitten/components/devsupport';
import {appThemeNavigation} from '../../theme/theme';

interface Props {
  onPressProfile: () => void;
}

export const TopAuthNavigation = ({
  onPressProfile,
}: Props): React.ReactElement => {
  const renderAvatar = (): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appThemeNavigation().colors.primary,
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 4,
      }}>
      <Text
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        LB
      </Text>
    </View>
  );

  const profileIcon = (props: any): IconElement => (
    <Icon {...props} name="more-vertical-outline" />
  );

  const renderLeftAction = (): TouchableWebElement => (
    <TopNavigationAction icon={renderAvatar} />
  );

  const renderRightAction = (): TouchableWebElement => (
    <TopNavigationAction onPress={onPressProfile} icon={profileIcon} />
  );

  const renderTitle = (): TouchableWebElement => (
    <Layout style={{flexDirection: 'column', marginLeft: 10}}>
      <Text category="s2">Bienvendo</Text>
      <Text category="h6">Luis Manuel Barragán González</Text>
    </Layout>
  );

  return (
    <Layout style={{elevation: 10, paddingVertical: 10}} level="1">
      <TopNavigation
        alignment="start"
        title={renderTitle}
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightAction}
      />
    </Layout>
  );
};
