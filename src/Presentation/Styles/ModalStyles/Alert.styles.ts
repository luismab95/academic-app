import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  buttonText: {color: 'white', textAlign: 'center', fontSize: 16},
  buttonTextCancel: {
    color: Colors.ERROR,
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  titleError: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.ERROR,
  },
  titleSuccess: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.SUCCESS,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    width: '100%',
  },

  buttonDisabled: {
    backgroundColor: Colors.PRIMARY.PRIMARY_QUEER_BLUE,
  },

  scrollContainer: {
    height: height * 0.3,
  },

  closeIcon: {
    position: 'absolute',
    top: 26,
    right: 26,
  },
});
