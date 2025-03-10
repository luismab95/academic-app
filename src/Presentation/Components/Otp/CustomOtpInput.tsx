import React, {useEffect, useRef} from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import {Colors} from '../../Utils';
import {SigninScreenStyles} from '../../Styles';

interface OptProps {
  length: number;
  isLoading: boolean;
  resetOtp: boolean;
  isValid: (arg: boolean) => void;
  onComplete: (otp: string) => void;
}

export const CustomOptInput = ({
  length,
  isLoading,
  resetOtp,
  onComplete,
  isValid,
}: OptProps) => {
  const otpInput = useRef<OTPTextInput | null>(null);

  const handleChange = (text: string) => {
    if (text.length === length && onComplete) {
      onComplete(text);
      isValid(true);
      return;
    }
    isValid(false);
  };

  useEffect(() => {
    otpInput.current?.inputs.forEach(input => {
      input.setNativeProps({editable: !isLoading});
    });
  }, [isLoading]);

  useEffect(() => {
    otpInput.current!.clear();
  }, [resetOtp]);

  return (
    <OTPTextInput
      ref={otpInput}
      autoFocus={true}
      inputCellLength={1}
      inputCount={length}
      textInputStyle={SigninScreenStyles.otpTextInput}
      handleTextChange={text => handleChange(text)}
      tintColor={Colors.PRIMARY.PRIMARY_RETRO_BLUE}
      keyboardType="default"
    />
  );
};
