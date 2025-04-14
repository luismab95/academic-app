import {useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AlertError} from '../../Components';
import {IWelcomeData, welcomeData} from '../../Utils';
import {createDevice} from '../../../Shared';
import {WelcomeScreenStyles} from '../../Styles';
import {RootStackParams} from '../../Navigation';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const onRegisterDevice = async () => {
    if (loading) return;
    setLoading(true);
    const response = await createDevice();
    if (response === null) {
      setModal(true);
      setLoading(false);
      return;
    }

    navigation.navigate('Register');
  };

  const renderItem = ({item}: {item: IWelcomeData}) => (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9', '#E8EEF9']}
      style={WelcomeScreenStyles.container}>
      <View style={WelcomeScreenStyles.wrapper}>
        <Image source={item.image} style={WelcomeScreenStyles.slideImage} />
        <Text style={[WelcomeScreenStyles.title, {fontFamily: 'Raleway-Bold'}]}>
          {item.title}
        </Text>
        <View style={WelcomeScreenStyles.descriptionContainer}>
          <Text
            style={[
              WelcomeScreenStyles.description,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            {item.description}
          </Text>
          <Text
            style={[
              WelcomeScreenStyles.description,
              {fontFamily: 'Nunito-Regular'},
            ]}>
            {item.sortDescrition}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <>
      <AppIntroSlider
        renderItem={renderItem}
        data={welcomeData}
        onDone={async () => {
          await onRegisterDevice();
        }}
        renderNextButton={() => (
          <View style={WelcomeScreenStyles.buttonContainer}>
            <Text
              style={[
                WelcomeScreenStyles.buttonText,
                {fontFamily: 'Nunito-SemiBold'},
              ]}>
              Siguiente
            </Text>
          </View>
        )}
        renderDoneButton={() => (
          <View style={WelcomeScreenStyles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={[
                  WelcomeScreenStyles.buttonText,
                  {fontFamily: 'Nunito-SemiBold'},
                ]}>
                Empezar
              </Text>
            )}
          </View>
        )}
        showSkipButton={false}
        dotStyle={WelcomeScreenStyles.dotStyle}
        bottomButton={true}
        dotClickEnabled={false}
        activeDotStyle={WelcomeScreenStyles.activeDotStyle}
      />
      <AlertError show={modal} onClose={() => setModal(false)} />
      </>
  );
};
