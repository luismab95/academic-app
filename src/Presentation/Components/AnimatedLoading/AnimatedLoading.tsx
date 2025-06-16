import {faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';

export const AnimatedLoading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../../../assets/animation_loading_3.json')}
        animationStyle={{width: 200, height: 200}}
        speed={1.5}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <FontAwesomeIcon icon={faLock} size={16} color={'#747474'} />
          <Text style={{marginLeft: 5, fontFamily: 'Nunito-SemiBold'}}>
            Cifrado de extremo a extremo.
          </Text>
        </View>
      </AnimatedLoader>
    </View>
  );
};
