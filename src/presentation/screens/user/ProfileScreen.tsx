import {useContext, useState} from 'react';
import {Divider, Layout, Modal, useTheme} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {ThemeContext} from '../../theme/theme';
import {
  ListElements,
  ListElementsProps,
  TopNavigationApp,
  UserAvatar,
  SignOut,
} from '../../components';
import {servicesContainer} from '../../providers/service.provider';
import {authStore} from '../../../shared';

interface Props extends StackScreenProps<RootStackParams, 'ProfileScreen'> {}

export const ProfileScreen = ({navigation}: Props) => {
  const [visible, setVisible] = useState(false);
  const themeContext = useContext(ThemeContext);
  const {logout} = authStore();
  const appTheme = useTheme();
  const listItems: ListElementsProps[] = [
    {
      title: 'Editar Perfil',
      icon: 'person-outline',
      onPress: () => {
        navigation.navigate('EditScreen');
      },
    },
    {
      title: themeContext.theme !== 'dark' ? 'Modo Oscuro' : 'Modo Claro',
      icon: themeContext.theme !== 'dark' ? 'moon-outline' : 'sun-outline',
      onPress: () => {
        (async () => {
          await themeContext.toggleTheme();
        })();
      },
    },
    {
      title: 'Seguridad',
      icon: 'shield-outline',
      onPress: () => {
        navigation.navigate('SecurityScreen');
      },
    },
    {
      title: 'Pólitica de Privacidad',
      icon: 'info-outline',
      onPress: () => {
        navigation.navigate('PrivacyPolicyScreen');
      },
    },
    {
      title: 'Cerrar Sesión',
      icon: 'log-out-outline',
      styles: {
        title: {color: appTheme['color-danger-500']},
        icon: {color: appTheme['color-danger-500']},
      },
      onPress: () => {
        setVisible(true);
      },
    },
  ];

  const onCancel = () => {
    setVisible(false);
  };

  const onLogout = async () => {
    await servicesContainer.auth.signOut();
    await logout!();
    navigation.navigate('LoadingScreen');
  };

  return (
    <>
      <TopNavigationApp title="Perfil" />
      <Layout style={{flex: 1}}>
        <ListElements
          data={listItems}
          ListHeaderComponent={
            <Layout style={{marginHorizontal: 20}}>
              {/* AVATAR */}
              <UserAvatar />

              <Divider style={{marginVertical: 20}} />
            </Layout>
          }
        />
      </Layout>
      <Modal
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={onCancel}
        shouldUseContainer={false}
        animationType="slide"
        visible={visible}>
        <SignOut onCancel={onCancel} onLogout={onLogout} />
      </Modal>
    </>
  );
};
