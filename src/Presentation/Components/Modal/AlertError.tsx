import {useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {ModalStyles} from '../../Styles';
import {errorStore} from '../../../Shared';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AlertError = ({show, onClose}: Props) => {
  const [visible, setVisible] = useState(false);

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
                source={require('../../../../assets/Images/error.png')}
              />
              <Text
                style={[
                  ModalStyles.modalTitle,
                  ModalStyles.titleError,
                  {fontFamily: 'Raleway-Bold'},
                ]}>
                {' '}
                ¡Oh!, Algo salio mal
              </Text>
              <Text style={ModalStyles.modalText}>
                {errorStore.getState().message}
              </Text>

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
