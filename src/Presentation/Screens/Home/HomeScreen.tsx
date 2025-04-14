import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation';
import {AlertError, AnimatedLoading, Header} from '../../Components';
import {bannerData} from '../../Utils';
import {
  HomeBannerSliderScreenStyles,
  HomeCertificatesStyles,
  HomeScreenStyles,
} from '../../Styles';
import {AcademicHook} from '../../../Shared';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {academicRecords, isLoading, modal, setModal} = AcademicHook();

  const handleNavigation = (id: number) => {
    if (id === 1) {
      navigation.navigate('Certificados');
    } else if (id === 2) {
      navigation.navigate('PrivacyPolicy');
    }
  };

  const certificatesListRender = () => {
    return (
      <View style={HomeCertificatesStyles.continer}>
        <View style={HomeCertificatesStyles.populerMentorContainer}>
          <Text
            style={[
              HomeCertificatesStyles.populerCourseText,
              {fontFamily: 'Raleway-Bold'},
            ]}>
            Tus Certificados
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Certificados')}>
            <Text
              style={[
                HomeCertificatesStyles.seeAllText,
                {fontFamily: 'Nunito-SemiBold'},
              ]}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        <Swiper
          style={{height: 200}}
          showsButtons={false}
          dotStyle={HomeCertificatesStyles.paginationDot}
          activeDotStyle={HomeCertificatesStyles.activePaginationDot}
          autoplay={true}
          autoplayTimeout={5}>
          {academicRecords.slice(0, 2).map(item => (
            <TouchableOpacity
              key={item.id}
              style={HomeCertificatesStyles.eventItemContainer}>
              <TouchableOpacity>
                <Image
                  style={HomeCertificatesStyles.eventItemImage}
                  source={require('../../../../assets/Images/Certificate/Certificate.png')}
                />
              </TouchableOpacity>
              <View style={HomeCertificatesStyles.eventRightSection}>
                <TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      HomeCertificatesStyles.eventText,
                      {fontFamily: 'Raleway-SemiBold'},
                    ]}>
                    {item.university}
                  </Text>
                </TouchableOpacity>
                <View style={HomeCertificatesStyles.eventRightTextSection}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={HomeCertificatesStyles.eventTextWrapper}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          HomeCertificatesStyles.eventTextAudience,
                          {fontFamily: 'Nunito-Medium'},
                        ]}>
                        {item.faculty}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      HomeCertificatesStyles.locationContainer,
                      {marginTop: 10},
                    ]}>
                    <View style={HomeCertificatesStyles.locationContainer}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          HomeCertificatesStyles.data,
                          {fontFamily: 'Nunito-Medium'},
                        ]}>
                        {item.school}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
    );
  };

  const sliderRender = () => {
    return (
      <View style={HomeBannerSliderScreenStyles.container}>
        <Swiper
          dotStyle={HomeBannerSliderScreenStyles.dot}
          activeDotStyle={HomeBannerSliderScreenStyles.activeDot}
          autoplay={true}
          autoplayTimeout={10}>
          {bannerData.map(item => (
            <View key={item.id} style={HomeBannerSliderScreenStyles.slide}>
              <View style={HomeBannerSliderScreenStyles.backgroundView}>
                <View
                  style={HomeBannerSliderScreenStyles.backgroundViewContainer}>
                  <Text
                    style={[
                      HomeBannerSliderScreenStyles.backgroundViewText,
                      {fontFamily: 'Raleway-Bold'},
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      HomeBannerSliderScreenStyles.backgroundViewOffer,
                      {fontFamily: 'Nunito-Regular'},
                    ]}>
                    {item.offer}
                  </Text>

                  {item.showButton && (
                    <TouchableOpacity
                      style={
                        HomeBannerSliderScreenStyles.backgroundViewButtonContainer
                      }
                      onPress={() => handleNavigation(item.id)}>
                      <Text
                        style={[
                          HomeBannerSliderScreenStyles.backgroundViewButtonText,
                          {fontFamily: 'Nunito-Bold'},
                        ]}>
                        {item.buttonText}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Image
                  style={HomeBannerSliderScreenStyles.backgroundViewImage}
                  source={item.bg_image_1}
                />
              </View>
              <Image
                source={item.bg_image}
                style={HomeBannerSliderScreenStyles.background}></Image>
            </View>
          ))}
        </Swiper>
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
          style={HomeScreenStyles.container}>
          <Header />
          <ScrollView>
            {sliderRender()}
            {certificatesListRender()}
          </ScrollView>
        </LinearGradient>
      )}
      <AlertError show={modal} onClose={() => setModal(false)} />
    </>
  );
};
