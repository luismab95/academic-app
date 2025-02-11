import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, LoadingScreen, SignInScreen} from '../screens';
import {SignUpScreen} from '../screens/auth/SignUpScreen';
import {SignInMfaScreen} from '../screens/auth/SignInMfaScreen';
import {ResetPasswordScreen} from '../screens/auth/ResetPasswrodScreen';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen';
import {VerifyResetPasswordScreen} from '../screens/auth/VerifyResetPasswordScreen';
import {LandingScreen} from '../screens/home/LandingScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  SignInScreen: undefined;
  SignInMfaScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  VerifyResetPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  LandingScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignInMfaScreen" component={SignInMfaScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="VerifyResetPasswordScreen"
        component={VerifyResetPasswordScreen}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
