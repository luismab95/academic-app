import {StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  signupImage: {
    width: '60%',
    height: 250,
    alignSelf: 'center',
    marginTop: 10,
  },

  getStartedText: {textAlign: 'center', fontSize: 24},

  accountCreateText: {
    textAlign: 'center',
    color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
    fontSize: 15,
    marginTop: 5,
    marginHorizontal: 16,
  },

  inputContainer: {marginHorizontal: 16, marginTop: 30, rowGap: 25},

  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#A1A1A1',
  },

  input2: {
    height: 55,
    marginRight: 16,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#A1A1A1',
  },

  icon: {position: 'absolute', left: 24, top: 17.8},

  visibleIcon: {position: 'absolute', right: 30, top: 15},

  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },

  buttonText: {color: 'white', textAlign: 'center', fontSize: 16},

  signupRedirect: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 20,
  },

  signupTextStyle: {fontSize: 18},

  signupText: {color: Colors.PRIMARY.PRIMARY_RETRO_BLUE, marginLeft: 5},
});
