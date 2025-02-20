import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {MyIcon} from './Icon';

interface Props {
  data: {
    id: number;
    name: string;
    grade: string;
    year: string;
  };
  onPress: (id: number) => void;
}

export const CertificateCard = ({data, onPress}: Props) => {
  return (
    <Card
      style={{
        marginVertical: 10,
      }}
      appearance="outline"
      status="primary">
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingVertical: 15,
          backgroundColor: 'transparent',
          marginBottom: 10,
        }}>
        {/* Icono */}
        <MyIcon name="file-text-outline" width={80} height={80} />
        {/* Texto */}
        <Layout
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: 'transparent',
          }}>
          <Text category="p1" style={{fontWeight: 'bold', marginBottom: 4}}>
            {data.grade}
          </Text>
          <Text category="p2" style={{fontWeight: '700', marginBottom: 4}}>
            {data.name}
          </Text>
          <Text category="s1" appearance="hint">
            {data.year}
          </Text>
        </Layout>
      </Layout>
      {/* Botón */}
      <Button
        onPress={() => {
          onPress(data.id);
        }}
        style={{borderRadius: 50, width: '100%'}}>
        Obtener
      </Button>
      <Layout style={{height: 20}}></Layout>
    </Card>
  );
};
