import {StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: Colors.NEUTRAL.NEUTRAL_ZHEN_ZHU_BAI_PEARL,
    borderRadius: 20,
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
  textContainer: {
    textAlign: 'justify',
    marginTop: 20,
    marginBottom: 40,
    fontSize: 16,
    color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
  },
});
