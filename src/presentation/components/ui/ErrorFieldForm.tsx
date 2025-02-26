import {Text, useTheme} from '@ui-kitten/components';
import {ErrorMessage, FormikErrors, FormikTouched} from 'formik';

export interface DynamicFormFields {
  [key: string]: any;
}

export const ErrorFieldForm = (
  errors: FormikErrors<DynamicFormFields>,
  touched: FormikTouched<DynamicFormFields>,
  field: string,
) => {
  const appTheme = useTheme();

  return errors[field] && touched[field] ? (
    <ErrorMessage name={field}>
      {msg => (
        <Text
          category="s2"
          appearance="hint"
          style={{color: appTheme['color-danger-500']}}>
          {msg}
        </Text>
      )}
    </ErrorMessage>
  ) : (
    <></>
  );
};
