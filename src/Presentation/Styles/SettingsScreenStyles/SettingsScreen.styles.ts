import {StyleSheet} from 'react-native';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 30,
  },

  profileContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 5,
    marginBottom: 30,
    marginRight: 10,
  },

  icon: {position: 'absolute', left: 24, top: 17.8},

  profileText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {marginHorizontal: 16, marginTop: 10, rowGap: 25},

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
  saveButton: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 20,
  },

  saveButtonText: {color: 'white', textAlign: 'center', fontSize: 16},
});
