import {Image, Text, View} from 'react-native';
import {errorStore} from '../../../Shared';
import {ModalStyles} from '../../Styles';

export const AlertError = () => {
  return (
    <View style={ModalStyles.container}>
      <Image
        style={ModalStyles.image}
        source={require('../../../../assets/Images/error.png')}
      />
      <Text style={[ModalStyles.titleError, {fontFamily: 'Raleway-Bold'}]}>
        ¡Oh!, Algo salio mal
      </Text>
      <Text style={[ModalStyles.textContainer, {fontFamily: 'Nunito-Regular'}]}>
        {errorStore.getState().message}
      </Text>
    </View>
  );
};
