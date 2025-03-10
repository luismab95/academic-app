import {Image, Text, View} from 'react-native';
import {ModalStyles} from '../../Styles';

export const AlertSuccess = ({message}: {message: string}) => {
  return (
    <View style={ModalStyles.container}>
      <Image
        style={ModalStyles.image}
        source={require('../../../../assets/Images/success.png')}
      />
      <Text style={[ModalStyles.titleSuccess, {fontFamily: 'Raleway-Bold'}]}>
        ¡Oh!, Enhorabuena
      </Text>
      <Text style={[ModalStyles.textContainer, {fontFamily: 'Nunito-Regular'}]}>
        {message}
      </Text>
    </View>
  );
};
