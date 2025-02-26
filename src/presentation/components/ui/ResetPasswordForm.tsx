import {useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import {InputPassword, LoadingIndicator} from './../';
import {ResetPasswordSchema} from '../../../shared';

interface Props {
  isLoading: boolean;
  onResetPassword: (password: string) => void;
}

export const ResetPasswordForm = ({isLoading, onResetPassword}: Props) => {
  const {height} = useWindowDimensions();

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: '100%', height: 300}}
          source={require('../../../assets/images/reset-password.png')}
          resizeMode="contain"
        />
      </View>

      <Layout
        style={{
          marginVertical: height * 0.02,
        }}>
        <Text category="h1">Crear Tu Nueva Contraseña</Text>
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
        }) => (
          <>
            <Layout style={{marginTop: height * 0.02}}>
              <InputPassword
                secureTextEntry={secureTextEntry}
                errors={errors}
                touched={touched}
                values={values}
                isLoading={isLoading}
                placeholder="Nueva contraseña"
                field="password"
                toggleSecureEntry={toggleSecureEntry}
                handleChange={handleChange('password')}
                handleBlur={handleBlur('password')}
              />

              <InputPassword
                secureTextEntry={secureTextEntryRecover}
                errors={errors}
                touched={touched}
                values={values}
                isLoading={isLoading}
                placeholder="Repite la contraseña"
                field="confirmPassword"
                toggleSecureEntry={toggleSecureEntryRecover}
                handleChange={handleChange('confirmPassword')}
                handleBlur={handleBlur('confirmPassword')}
              />
            </Layout>

            {/* Button */}
            <Layout
              style={{
                marginTop: height * 0.04,
                alignItems: 'center',
              }}>
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
                      Guardar
                    </Text>
                  )
                )}
              </Button>
            </Layout>
          </>
        )}
      </Formik>
    </>
  );
};
