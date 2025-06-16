import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

const {width, height} = Dimensions.get('window');
const imageSize = width * 0.2;
const imageMarginBottom = height * 0.02;
const textSize = width * 0.05;
const buttonSize = width * 0.1;
const buttonPadding = width * 0.03;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C66ED',
    paddingBottom: 20,
  },
  headerImage: {
    alignItems: 'center',
    backgroundColor: Colors.NEUTRAL.NEUTRAL_ZHEN_ZHU_BAI_PEARL,
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerImageText: {
    textAlign: 'center',
    marginHorizontal: 10,
    color: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    fontWeight: 'bold',
    fontSize: 32,
  },
  headerText: {
    fontSize: textSize,
    color: 'white',
  },
  headerEmail: {fontSize: 16, color: 'lightgray'},
  drawerContent: {fontSize: 18, fontWeight: 'bold'},
  signOutButton: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  signOutText: {color: '#2E86C1'},
  drawerCloseButton: {
    position: 'absolute',
    right: width * 0.13,
    backgroundColor: '#3498DB',
    borderRadius: buttonSize / 1,
    padding: buttonPadding,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {marginTop: 15, marginBottom: 30, marginLeft: 10, flex: 1},
});
