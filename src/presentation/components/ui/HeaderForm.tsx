import React from 'react';
import {
  Image,
  ImageSourcePropType,
  useWindowDimensions,
  View,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

interface Props {
  title: string;
  image: ImageSourcePropType;
}

export const HeaderForm = ({title, image}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <>
      {/* Imagen */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: '100%', height: 300}}
          source={image}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Layout style={{marginVertical: height * 0.02}}>
        <Text category="h1">{title}</Text>
      </Layout>
    </>
  );
};
