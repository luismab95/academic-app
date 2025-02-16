import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Input} from '@ui-kitten/components';

interface OptProps {
  length: number;
  isLoading: boolean;
  resetOtp: boolean;
  isValid: (arg: boolean) => void;
  onComplete: (otp: string) => void;
}

export const Opt = ({
  length = 4,
  isLoading,
  resetOtp,
  onComplete,
  isValid,
}: OptProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(Input | null)[]>([]);

  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const handleChange = (text: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.join('').length === length && onComplete) {
      onComplete(newOtp.join(''));
      isValid(true);
      return;
    }
    isValid(false);
  };

  useEffect(() => {
    setIsLoadingOtp(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setOtp(Array(length).fill(''));
  }, [resetOtp]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      {otp.map((value, index) => (
        <Input
          key={index}
          ref={el => (inputs.current[index] = el)}
          style={[{width: 80}, index < otp.length - 1 && {marginRight: 10}]}
          value={value}
          onChangeText={text => handleChange(text, index)}
          maxLength={1}
          placeholder="-"
          size="large"
          textAlign="center"
          disabled={isLoadingOtp}
        />
      ))}
    </View>
  );
};
