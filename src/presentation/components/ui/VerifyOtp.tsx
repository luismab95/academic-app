import {useEffect, useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import {LoadingIndicator} from './LoadingIndicator';
import {Opt} from './Opt';

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
  const {width, height} = useWindowDimensions();

  const [seconds, setSeconds] = useState(3);
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [resetOtp, setResetOtp] = useState(false);
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
    setResetOtp(prevState => !prevState);
    onResendOtp();
  };

  const onSetValidOtp = (isValid: boolean) => {
    setIsValidOtp(isValid);
  };

  const onGetOtp = (otp: string) => {
    setOtp(otp);
  };

  return (
    <>
      {/* Imagen OTP */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: '100%', height: 300}}
          source={require('../../../assets/images/otp.png')}
          resizeMode="contain"
        />
      </View>

      {/* Mensaje OTP */}
      <Layout style={{alignItems: 'center', marginVertical: height * 0.03}}>
        <Text style={{textAlign: 'center'}}>{message}</Text>
      </Layout>

      {/* Campo OTP */}
      <Layout style={{alignItems: 'center', marginVertical: height * 0.03}}>
        <Opt
          length={4}
          onComplete={onGetOtp}
          isValid={onSetValidOtp}
          isLoading={isLoading}
          resetOtp={resetOtp}
        />
      </Layout>

      {/* Contador de reenvío */}
      <Layout style={{alignItems: 'center', marginVertical: height * 0.03}}>
        {!sendOtp ? (
          <Text>
            Reenviar código en <Text status="primary">{seconds}</Text> segundos
          </Text>
        ) : (
          <Text
            status="primary"
            style={{textDecorationLine: 'underline'}}
            category="s1"
            onPress={onSendOtp}>
            Reenviar Código
          </Text>
        )}
      </Layout>

      {/* Botón de Verificación */}
      <Layout style={{alignItems: 'center', marginVertical: width * 0.03}}>
        <Button
          style={{borderRadius: 50, width: '100%'}}
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
    </>
  );
};
