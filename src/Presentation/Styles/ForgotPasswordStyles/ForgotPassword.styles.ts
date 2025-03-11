import {StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },

  buttonText: {color: 'white', textAlign: 'center', fontSize: 16},

  loginLink: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {color: Colors.PRIMARY.PRIMARY_RETRO_BLUE, marginLeft: 5},

  backText: {fontSize: 18},
});
