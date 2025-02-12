import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/Icon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';
import {UserAvatar} from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'EditScreen'> {}

export const EditScreen = ({navigation}: Props) => {
  return (
    <>
      <TopNavigationApp title="Editar Perfil" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          {/* AVATAR */}
          <UserAvatar />
          <Divider style={{marginVertical: 20}} />

          {/* Inputs */}
          <Layout style={{marginTop: 20}}>
            <Input
              placeholder="Nombres"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="text-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Apellidos"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="text-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Identificación"
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={10}
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="credit-card-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              size="large"
              // value={form.email}
              // onChangeText={email => setForm({...form, email})}
              accessoryLeft={
                <MyIcon name="email-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
            <Layout style={{height: 10}} />

            <Input
              placeholder="Telefono"
              autoCapitalize="none"
              keyboardType="phone-pad"
              size="large"
              // value={form.password}
              // onChangeText={password => setForm({...form, password})}
              accessoryLeft={
                <MyIcon name="phone-outline" width={20} height={20} />
              }
              style={{marginBottom: 10}}
            />
          </Layout>

          {/* Button */}
          <Layout style={{marginTop: 60}}></Layout>
          <Layout>
            <Button
              style={{borderRadius: 50}}
              // disabled={isPosting}
              // onPress={onLogin}>
            >
              {evaProps => (
                <Text
                  {...evaProps}
                  style={{fontSize: 20, color: 'white'}}
                  category="label">
                  Actualizar
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
