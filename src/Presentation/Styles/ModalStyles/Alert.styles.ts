import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

const {width} = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    width: '100%',
  },
  buttonText: {color: 'white', textAlign: 'center', fontSize: 16},
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
