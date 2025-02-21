import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {appThemeNavigation} from '../../theme/theme';

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
  const theme = appThemeNavigation();
  const otpInput = useRef<OTPTextInput | null>(null);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const handleChange = (text: string) => {
    if (text.length === length && onComplete) {
      onComplete(text);
      isValid(true);
      return;
    }
    isValid(false);
  };

  useEffect(() => {
    setIsLoadingOtp(isLoading);
    otpInput.current?.inputs.forEach(input => {
      input.setNativeProps({editable: !isLoadingOtp});
    });
  }, [isLoading]);

  useEffect(() => {
    otpInput.current!.clear();
  }, [resetOtp]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
      }}>
      <OTPTextInput
        ref={otpInput}
        autoFocus={true}
        inputCellLength={1}
        inputCount={length}
        textInputStyle={styles.roundedTextInput}
        handleTextChange={text => handleChange(text)}
        tintColor={theme.colors.primary}
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    width: 80,
    fontWeight: 'light',
  },
});
