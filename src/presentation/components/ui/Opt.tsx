import React, {useState} from 'react';
import {View} from 'react-native';
import {Input} from '@ui-kitten/components';

interface OptProps {
  lenght: number;
}

export const Opt = ({lenght = 4}: OptProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      console.log('OTP enviado:', otpString);
    } else {
      console.log('OTP inválido');
    }
  };

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
          style={[{width: 80}, index < otp.length - 1 && {marginRight: 10}]}
          value={value}
          onChangeText={text => handleChange(text, index)}
          maxLength={1}
          keyboardType="numeric"
          placeholder="-"
          size="large"
          textAlign="center"
        />
      ))}
    </View>
  );
};
