import {
  Button,
  Card,
  Divider,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';

interface Props {
  onCancel: () => void;
  onLogout: () => void;
}

export const SignOut = ({onCancel, onLogout}: Props) => {
  const {width} = useWindowDimensions();
  const appTheme = useTheme();

  return (
    <Card
      disabled={true}
      style={{
        width: width - 40,
        borderRadius: 20,
        backgroundColor: appTheme['background-basic-color-1'],
      }}>
      <Text
        style={{
          textAlign: 'center',
          padding: 20,
          color: appTheme['color-danger-500'],
        }}
        category="h4">
        CERRAR SESIÓN
      </Text>

      <Divider />

      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          padding: 20,
          fontSize: 16,
        }}
        category="p1">
        ¿Esta seguro/a que desea cerrar su sesión?
      </Text>

      <Layout
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'space-around',
        }}>
        <Button
          status="basic"
          style={{
            borderRadius: 20,
            marginRight: 10,
            width: (width - 100) / 2,
          }}
          onPress={() => onCancel()}>
          Cancelar
        </Button>
        <Button
          style={{borderRadius: 20, width: (width - 100) / 2}}
          status="danger"
          onPress={() => onLogout()}>
          Aceptar
        </Button>
      </Layout>
    </Card>
  );
};
