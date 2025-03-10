import {StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: '60%',
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
  },
  welcomeText: {textAlign: 'center', fontSize: 24},

  learningText: {
    textAlign: 'center',
    color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
    fontSize: 15,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  inputContainer: {marginHorizontal: 16, marginTop: 30, rowGap: 30},

  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
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

  loginLink: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {color: Colors.PRIMARY.PRIMARY_RETRO_BLUE, marginLeft: 5},

  backText: {fontSize: 18},
});
