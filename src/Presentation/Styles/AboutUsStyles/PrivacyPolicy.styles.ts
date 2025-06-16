import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  policyContainer: {
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Nunito-Bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
  },
  textList: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 5,
    marginLeft: 20,
    fontFamily: 'Nunito-Regular',
  },
  textListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
  },
});
