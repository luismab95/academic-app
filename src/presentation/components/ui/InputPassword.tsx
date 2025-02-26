import React from 'react';
import {Input} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {FormikErrors, FormikTouched} from 'formik';
import {DynamicFormFields, ErrorFieldForm} from './ErrorFieldForm';
import {MyIcon} from './Icon';

interface Props {
  secureTextEntry: boolean;
  errors: FormikErrors<DynamicFormFields>;
  touched: FormikTouched<DynamicFormFields>;
  values: DynamicFormFields;
  isLoading: boolean;
  placeholder: string;
  field: string;
  handleChange: any;
  handleBlur: any;
  toggleSecureEntry: () => void;
}

export const InputPassword = ({
  secureTextEntry,
  placeholder,
  field,
  errors,
  touched,
  values,
  isLoading,
  handleChange,
  handleBlur,
  toggleSecureEntry,
}: Props) => {
  return (
    <Input
      placeholder={placeholder}
      autoCapitalize="none"
      secureTextEntry={!secureTextEntry}
      status={errors[field] && touched[field] ? 'danger' : 'basic'}
      size="large"
      onChangeText={handleChange}
      onBlur={handleBlur}
      value={values[field]}
      caption={ErrorFieldForm(errors, touched, field)}
      accessoryLeft={<MyIcon name="lock-outline" width={20} height={20} />}
      accessoryRight={
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <MyIcon
            name={!secureTextEntry ? 'eye' : 'eye-off'}
            width={20}
            height={20}
          />
        </TouchableWithoutFeedback>
      }
      disabled={isLoading}
      style={{marginBottom: 20}}
    />
  );
};
