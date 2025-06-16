import {Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/';
import {ErrorMessage, FormikErrors, FormikTouched} from 'formik';
import {CustomErrorInputStyles} from '../../Styles';

interface DynamicFormFields {
  [key: string]: any;
}

interface Props {
  errors: FormikErrors<DynamicFormFields>;
  touched: FormikTouched<DynamicFormFields>;
  field: string;
}

export const CustomErrorInput = ({errors, touched, field}: Props) => {
  return errors[field] && touched[field] ? (
    <ErrorMessage name={field}>
      {msg => (
        <View style={CustomErrorInputStyles.errorContainer}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size={18}
            color={'red'}
            style={{marginHorizontal: 4}}
          />
          <Text style={CustomErrorInputStyles.errorText}>{msg}</Text>
        </View>
      )}
    </ErrorMessage>
  ) : (
    <></>
  );
};
