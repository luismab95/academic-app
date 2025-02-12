import {Button, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {Opt} from './Opt';

interface Props {
  onVerifyOtp: () => void;
  onResendOtp: () => void;
}

export const VerifyOtp = ({onVerifyOtp, onResendOtp}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{paddingTop: height * 0.08}}>
      {/* Space */}
      <Layout style={{height: 50}} />

      {/* Información del código */}
      <Layout
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>El código ha sido enviado a lu***********</Text>
      </Layout>

      {/* Space */}
      <Layout style={{height: 60}} />

      {/* Inputs */}
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Opt lenght={4} />
      </Layout>

      {/* Space */}
      <Layout style={{height: 60}} />

      {/* Información para reenviar código */}
      <Layout
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Reenviar código en</Text>
        <Text status="primary" category="s1" onPress={() => onResendOtp()}>
          {'  '}
          55{'  '}
        </Text>
        <Text>segundos </Text>
      </Layout>

      {/* Space */}
      <Layout style={{height: 100}} />

      {/* Button */}
      <Layout>
        <Button
          style={{borderRadius: 50}}
          // disabled={isPosting}
          onPress={() => onVerifyOtp()}>
          {evaProps => (
            <Text
              {...evaProps}
              style={{fontSize: 20, color: 'white'}}
              category="label">
              Verificar
            </Text>
          )}
        </Button>
      </Layout>

      {/* Space */}
      <Layout style={{height: 40}} />
    </Layout>
  );
};
