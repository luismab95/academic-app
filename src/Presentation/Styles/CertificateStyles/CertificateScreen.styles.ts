import {Dimensions, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../Utils';

export const styles = StyleSheet.create({
  container: {flex: 1},

  eventMainWrapper: {marginHorizontal: 16, marginTop: 16},

  eventItemContainer: {
    backgroundColor: '#FFF',
    marginBottom: 12,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    marginHorizontal: 16,
  },

  eventItemImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: 4,
  },

  eventRightSection: {flex: 1, paddingLeft: 8},

  eventText: {fontSize: responsiveFontSize(2)},

  mentorImage: {width: 30, height: 30, flexDirection: 'row'},

  mentorImageContainer: {flexDirection: 'row'},

  eventRightTextSection: {marginTop: 10},

  eventTextAudience: {fontSize: 15, color: '#808080', marginTop: -4},

  eventTextAudiences: {fontSize: 15, color: '#808080'},

  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  eventTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
  },

  ratingText: {
    marginLeft: 4,
    color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
  },

  locationContainer: {flexDirection: 'row', alignItems: 'center'},

  data: {
    marginLeft: 1,
    color: '#808080',
    fontSize: 16,
  },

  enrollContainer: {
    backgroundColor: '#FFFF',
    marginHorizontal: 16,
    paddingVertical: 11,
  },

  enrollButtonWrap: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    paddingVertical: 16,
    borderRadius: 4,
  },

  enrollText: {textAlign: 'center', color: '#FFFF', fontSize: 16},

  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pdf: {
    width: responsiveWidth(90),
    height: Dimensions.get('window').height,
  },

  inputContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    height: 250,
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3f51b5',
  },
  loadFile: {
    borderStyle: 'solid',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  certificateContainer: {
    marginTop: 16,
    flex: 1,
    padding: 16,
  },
  cardDetail: {
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
  code: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
