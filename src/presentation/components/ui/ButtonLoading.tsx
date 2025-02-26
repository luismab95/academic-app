import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {LoadingIndicator} from './LoadingIndicator';

interface Props {
  isLoading: boolean;
  isValid: boolean;
  label: string;
  handleSubmit: () => void;
}

export const ButtonLoading = ({
  isLoading,
  isValid,
  label,
  handleSubmit,
}: Props) => {
  return (
    <Button
      style={{borderRadius: 50, width: '100%'}}
      disabled={isLoading || !isValid}
      onPress={() => handleSubmit()}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        evaProps => (
          <Text
            {...evaProps}
            style={{fontSize: 20, color: 'white'}}
            category="label">
            {label}
          </Text>
        )
      )}
    </Button>
  );
};
