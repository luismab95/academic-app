import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AnimatedLoading, CustomDrawerHeader} from '../../Components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {AcademicRecord} from '../../../Domian';
import {RootStackParams} from '../../Navigation';
import {AcademicHook} from '../../../Shared';
import {CertificatesStyles, WelcomeScreenStyles} from '../../Styles';

export const CertificateScreen = () => {
  const {academicRecords, isLoading} = AcademicHook();
  const navigate = useNavigation<NavigationProp<RootStackParams>>();

  const handleCertificateDetails = (item: AcademicRecord) => {
    navigate.navigate('CertificateDetail', {item});
  };

  const noInfoRender = () => {
    return (
      <View style={WelcomeScreenStyles.container}>
        <View style={WelcomeScreenStyles.wrapper}>
          <Image
            source={require('../../../../assets/Images/not-found.png')}
            style={WelcomeScreenStyles.slideImage}
          />
          <Text
            style={[WelcomeScreenStyles.title, {fontFamily: 'Raleway-Bold'}]}>
            Lo Sentimos
          </Text>
          <View style={WelcomeScreenStyles.descriptionContainer}>
            <Text
              style={[
                WelcomeScreenStyles.description,
                {fontFamily: 'Nunito-Regular'},
              ]}>
              No se encontraron resultados de certificados acadèmicos.
            </Text>
            <Text
              style={[
                WelcomeScreenStyles.description,
                {fontFamily: 'Nunito-Regular'},
              ]}>
              Contacte a soporte para más información.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <LinearGradient
          colors={['#E5ECF9', '#F6F7F9']}
          style={CertificatesStyles.container}>
          <CustomDrawerHeader>Certificados</CustomDrawerHeader>
          {academicRecords.length === 0 ? (
            noInfoRender()
          ) : (
            <FlatList
              data={academicRecords}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleCertificateDetails(item)}
                  key={item.id}
                  style={CertificatesStyles.eventItemContainer}>
                  <TouchableOpacity>
                    <Image
                      style={CertificatesStyles.eventItemImage}
                      source={require('../../../../assets/Images/Certificate/Certificate.png')}
                    />
                  </TouchableOpacity>
                  <View style={CertificatesStyles.eventRightSection}>
                    <TouchableOpacity>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          CertificatesStyles.eventText,
                          {fontFamily: 'Raleway-SemiBold'},
                        ]}>
                        {item.university}
                      </Text>
                    </TouchableOpacity>
                    <View style={CertificatesStyles.eventRightTextSection}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={CertificatesStyles.eventTextWrapper}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[
                              CertificatesStyles.eventTextAudience,
                              {fontFamily: 'Nunito-Medium'},
                            ]}>
                            {item.faculty}
                          </Text>
                        </View>
                      </View>
                      <View style={[CertificatesStyles.locationContainer]}>
                        <View style={CertificatesStyles.locationContainer}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[
                              CertificatesStyles.data,
                              {fontFamily: 'Nunito-Medium', marginTop: 2},
                            ]}>
                            {item.school}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          CertificatesStyles.locationContainer,
                          {marginTop: 5},
                        ]}>
                        <FontAwesomeIcon
                          icon={faCalendar}
                          size={20}
                          color={'#A1A1A1'}
                        />
                        <Text
                          style={[
                            CertificatesStyles.data,
                            {
                              fontFamily: 'Nunito-Medium',
                              marginLeft: 5,
                            },
                          ]}>
                          {item.year}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </LinearGradient>
      )}
    </>
  );
};
