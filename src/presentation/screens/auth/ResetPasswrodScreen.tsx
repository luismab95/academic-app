import {useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {MyIcon} from '../../components/ui/Icon';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationSimpleUsageShowcase} from '../../components/ui/TopNavigation';

interface Props
  extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> {}

export const ResetPasswordScreen = ({navigation}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [secureTextEntryRecover, setSecureTextEntryRecover] = useState(false);

  const {height} = useWindowDimensions();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRecover = (): void => {
    setSecureTextEntryRecover(!secureTextEntryRecover);
  };

  return (
    <>
      <TopNavigationSimpleUsageShowcase title="Crear Nueva Contraseña" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          {/* Space */}
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              paddingHorizontal: 40,
            }}>
            <Image
              source={require('../../../assets/images/reset-password.png')}
            />
          </Layout>

          {/* Inputs */}
          <Layout style={{marginTop: 20}}>
            <Text
              category="s1"
              style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
              Crear Tu Nueva Contraseña
            </Text>
            <Input
              placeholder="Nueva contraseña"
              autoCapitalize="none"
              size="large"
              secureTextEntry={!secureTextEntry}
              // value={form.password}
              // onChangeText={password => setForm({...form, password})}
              accessoryLeft={
                <MyIcon name="lock-outline" width={20} height={20} />
              }
              accessoryRight={
                <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                  <MyIcon
                    name={!secureTextEntry ? 'eye' : 'eye-off'}
                    width={20}
                    height={20}
                  />
                </TouchableWithoutFeedback>
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Repite la contraseña"
              autoCapitalize="none"
              size="large"
              secureTextEntry={!secureTextEntryRecover}
              // value={form.password}
              // onChangeText={password => setForm({...form, password})}
              accessoryLeft={
                <MyIcon name="lock-outline" width={20} height={20} />
              }
              accessoryRight={
                <TouchableWithoutFeedback onPress={toggleSecureEntryRecover}>
                  <MyIcon
                    name={!secureTextEntryRecover ? 'eye' : 'eye-off'}
                    width={20}
                    height={20}
                  />
                </TouchableWithoutFeedback>
              }
              style={{marginBottom: 10}}
            />
          </Layout>

          {/* Space */}
          <Layout style={{height: 60}} />

          {/* Button */}
          <Layout>
            <Button
              style={{borderRadius: 40}}
              // disabled={isPosting}
              onPress={() => navigation.navigate('SignInScreen')}>
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Guardar
                </Text>
              )}
            </Button>
          </Layout>

          {/* Space */}
          <Layout style={{height: 40}} />
        </ScrollView>
      </Layout>
    </>
  );
};
