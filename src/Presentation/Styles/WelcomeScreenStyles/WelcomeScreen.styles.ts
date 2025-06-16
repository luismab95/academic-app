import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {paddingHorizontal: 16, flex: 1},

  wrapper: {
    marginTop: 50,
  },

  slideImage: {alignSelf: 'center', marginBottom: 30},
  dotStyle: {
    backgroundColor: Colors.NEUTRAL.NEUTRAL_CENTRE_STAGE,
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },

  activeDotStyle: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },

  title: {
    fontSize: hp('3.5%'),
    textAlign: 'center',
  },

  description: {
    fontSize: hp('2.5%'),
    color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
    textAlign: 'center',
  },

  descriptionContainer: {
    marginTop: 15,
  },

  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    width: responsiveWidth(88),
    height: responsiveHeight(5.5),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.NEUTRAL.NEUTRAL_WHITE,
    fontSize: 16,
  },

  containerRole: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
  },

  cardsContainer: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  studentCard: {
    backgroundColor: '#ffffff',
    borderColor: '#3498db',
    borderWidth: 1,
  },
  verifierCard: {
    backgroundColor: '#ffffff',
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
  },
  cardDescription: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 15,
  },
  cardActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    textAlign: 'right',
  },
});
