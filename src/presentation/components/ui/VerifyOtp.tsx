import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import {Opt} from './Opt';
import {LoadingIndicator} from './LoadingIndicator';

interface Props {
  message: string;
  isLoading: boolean;
  onVerifyOtp: (otp: string) => void;
  onResendOtp: () => void;
}

export const VerifyOtp = ({
  message,
  isLoading,
  onVerifyOtp,
  onResendOtp,
}: Props) => {
  const [seconds, setSeconds] = useState(300);
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendOtp, setSendOtp] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      setSendOtp(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const onSendOtp = () => {
    setSendOtp(false);
    setSeconds(300);
    onResendOtp();
  };

  const onSetValidOtp = (isValid: boolean) => {
    setIsValidOtp(isValid);
  };

  const onGetOtp = (otp: string) => {
    setOtp(otp);
  };

  return (
    <Layout style={{paddingTop: 0}}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
          marginTop: 20,
        }}>
        <Image
          style={{height: 400, width: 400}}
          source={require('../../../assets/images/otp.png')}
        />
      </Layout>

      {/* Space */}
      <Layout style={{height: 50}} />

      {/* Información del código */}
      <Layout
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{message}</Text>
      </Layout>

      {/* Space */}
      <Layout style={{height: 40}} />

      {/* Inputs */}
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Opt length={4} onComplete={onGetOtp} isValid={onSetValidOtp} />
      </Layout>

      {/* Space */}
      <Layout style={{height: 40}} />

      {!sendOtp ? (
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Reenviar código en</Text>
          <Text status="primary" category="s1">
            {'  '}
            {seconds}
            {'  '}
          </Text>
          <Text>segundos </Text>
        </Layout>
      ) : (
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            status="primary"
            style={{textDecorationLine: 'underline', textAlign: 'center'}}
            category="s1"
            onPress={() => onSendOtp()}>
            Reenviar Código
          </Text>
        </Layout>
      )}

      {/* Reenviar OTP */}

      {/* Space */}
      <Layout style={{height: 100}} />

      {/* Button */}
      <Layout>
        <Button
          style={{borderRadius: 50}}
          disabled={isLoading || !isValidOtp}
          onPress={() => onVerifyOtp(otp)}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            evaProps => (
              <Text
                {...evaProps}
                style={{fontSize: 20, color: 'white'}}
                category="label">
                Verificar
              </Text>
            )
          )}
        </Button>
      </Layout>

      {/* Space */}
      <Layout style={{height: 40}} />
    </Layout>
  );
};
