import {useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {ModalStyles} from '../../Styles';

interface Props {
  show: boolean;
  message: string;
  onClose: () => void;
}

export const AlertSuccess = ({show, message, onClose}: Props) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <View style={ModalStyles.container}>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="fade">
        <View style={ModalStyles.backdrop}>
          <View style={ModalStyles.modalContainer}>
            <View style={ModalStyles.modalContent}>
              <Image
                style={ModalStyles.image}
                source={require('../../../../assets/Images/success.png')}
              />
              <Text
                style={[
                  ModalStyles.modalTitle,
                  ModalStyles.titleSuccess,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                ¡Oh!, Enhorabuena
              </Text>
              <Text style={ModalStyles.modalText}>{message}</Text>

              <View style={ModalStyles.buttonsContainer}>
                <TouchableOpacity
                  style={[ModalStyles.buttonContainer]}
                  onPress={() => handleClose()}>
                  <Text
                    style={[
                      ModalStyles.buttonText,
                      {fontFamily: 'Raleway-Bold'},
                    ]}>
                    Aceptar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
