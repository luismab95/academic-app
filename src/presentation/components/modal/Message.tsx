import React from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {Button, Card, Layout, Text, useTheme} from '@ui-kitten/components';

export interface PropsMessageModal {
  title: string;
  content: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  onContinue: () => void;
  onCancel?: () => void;
}

export const Message = ({
  title,
  content,
  type,
  onContinue,
  onCancel,
}: PropsMessageModal) => {
  const {width} = useWindowDimensions();
  const appTheme = useTheme();
  const successImage = require(`../../../assets/images/success.png`);
  const errorImage = require(`../../../assets/images/error.png`);
  const warningImage = require(`../../../assets/images/warning.png`);
  const infoImage = require(`../../../assets/images/info.png`);

  const titleColor = () => {
    let color = appTheme['color-success-500'];
    switch (type) {
      case 'success':
        color = appTheme['color-success-500'];
        break;
      case 'danger':
        color = appTheme['color-danger-500'];
        break;
      case 'warning':
        color = appTheme['color-warning-500'];
        break;
      case 'info':
        color = appTheme['color-info-500'];
        break;
    }
    return color;
  };

  return (
    <Card
      disabled={true}
      style={{
        width: width,
        backgroundColor: appTheme['background-basic-color-1'],
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 0,
      }}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 40,
        }}>
        {type === 'success' && (
          <Image
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
            source={successImage}
          />
        )}
        {type === 'danger' && (
          <Image
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
            source={errorImage}
          />
        )}
        {type === 'warning' && (
          <Image
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
            source={warningImage}
          />
        )}
        {type === 'info' && (
          <Image
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
            source={infoImage}
          />
        )}
      </Layout>

      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 20,
          color: titleColor(),
          fontSize: 32,
        }}
        category="h4">
        {title}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          paddingHorizontal: 20,
          fontSize: 16,
        }}
        category="p1">
        {content}
      </Text>

      <Layout
        style={{
          height: 20,
        }}></Layout>

      <Layout
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'space-around',
        }}>
        {type === 'warning' && (
          <Button
            status="basic"
            style={{
              borderRadius: 20,
              marginRight: 10,
              width: (width - 100) / 2,
            }}
            onPress={() => onCancel!()}>
            Cancelar
          </Button>
        )}

        <Button
          style={{borderRadius: 20, width: (width - 100) / 2}}
          status={type}
          onPress={() => onContinue()}>
          Aceptar
        </Button>
      </Layout>
    </Card>
  );
};
