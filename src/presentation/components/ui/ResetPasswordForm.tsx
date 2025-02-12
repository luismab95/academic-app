import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {MyIcon} from './Icon';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {useState} from 'react';
import {Image} from 'react-native';

interface Props {
  onResetPassword: () => void;
}

export const ResetPasswordForm = ({onResetPassword}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [secureTextEntryRecover, setSecureTextEntryRecover] = useState(false);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRecover = (): void => {
    setSecureTextEntryRecover(!secureTextEntryRecover);
  };
  return (
    <>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          paddingHorizontal: 40,
        }}>
        <Image source={require('../../../assets/images/reset-password.png')} />
      </Layout>

      {/* INPUTS */}
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
          accessoryLeft={<MyIcon name="lock-outline" width={20} height={20} />}
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
          accessoryLeft={<MyIcon name="lock-outline" width={20} height={20} />}
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
          onPress={() => onResetPassword()}>
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
    </>
  );
};
