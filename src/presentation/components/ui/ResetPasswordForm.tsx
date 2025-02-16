import {useState} from 'react';
import {Dimensions, Image} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {ErrorFieldForm, LoadingIndicator, MyIcon} from './../';
import {ResetPasswordSchema} from '../../../shared';
import {Formik} from 'formik';

interface Props {
  isLoading: boolean;
  onResetPassword: (password: string) => void;
}

export const ResetPasswordForm = ({isLoading, onResetPassword}: Props) => {
  const screenHeight = Dimensions.get('window').height;

  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [secureTextEntryRecover, setSecureTextEntryRecover] = useState(false);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRecover = (): void => {
    setSecureTextEntryRecover(!secureTextEntryRecover);
  };

  return (
    <>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
        <Image
          style={{width: '100%', height: 300, resizeMode: 'contain'}}
          source={require('../../../assets/images/reset-password.png')}
        />
      </Layout>

      {/* INPUTS */}
      <Formik
        initialValues={{password: '', confirmPassword: ''} as any}
        validationSchema={ResetPasswordSchema}
        validateOnMount
        onSubmit={values => onResetPassword(values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => {
          return (
            <>
              <Layout
                style={{
                  height: screenHeight * 0.3,
                  marginVertical: screenHeight * 0.01,
                }}>
                <Text
                  category="s1"
                  style={{textAlign: 'left', fontSize: 20, marginBottom: 30}}>
                  Crear Tu Nueva Contraseña
                </Text>
                <Input
                  placeholder="Nueva contraseña"
                  autoCapitalize="none"
                  secureTextEntry={!secureTextEntry}
                  status={errors.password && touched.email ? 'danger' : 'basic'}
                  size="large"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  caption={ErrorFieldForm(errors, touched, 'password')}
                  accessoryLeft={
                    <MyIcon name="lock-outline" width={20} height={20} />
                  }
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
                  style={{marginBottom: 10}}
                />
                <Layout style={{height: 10}} />

                <Input
                  placeholder="Repite la contraseña"
                  autoCapitalize="none"
                  secureTextEntry={!secureTextEntryRecover}
                  status={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'danger'
                      : 'basic'
                  }
                  size="large"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  caption={ErrorFieldForm(errors, touched, 'confirmPassword')}
                  accessoryLeft={
                    <MyIcon name="lock-outline" width={20} height={20} />
                  }
                  accessoryRight={
                    <TouchableWithoutFeedback
                      onPress={toggleSecureEntryRecover}>
                      <MyIcon
                        name={!secureTextEntryRecover ? 'eye' : 'eye-off'}
                        width={20}
                        height={20}
                      />
                    </TouchableWithoutFeedback>
                  }
                  disabled={isLoading}
                  style={{marginBottom: 10}}
                />
              </Layout>

              {/* Button */}
              <Layout style={{marginVertical: screenHeight * 0.01}}>
                <Button
                  style={{borderRadius: 40, width: '100%'}}
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
                        Guardar
                      </Text>
                    )
                  )}
                </Button>
              </Layout>
            </>
          );
        }}
      </Formik>

      {/* Space */}
      <Layout style={{height: 40}} />
    </>
  );
};
