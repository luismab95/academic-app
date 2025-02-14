import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {
  EditScreen,
  ForgotPasswordScreen,
  HomeScreen,
  LandingScreen,
  LoadingScreen,
  PrivacyPolicyScreen,
  ProfileScreen,
  ResetPasswordScreen,
  SecurityScreen,
  SignInMfaScreen,
  SignInScreen,
  SignUpScreen,
  VerifyResetPasswordScreen,
} from '../screens';

export type RootStackParams = {
  LoadingScreen: undefined;
  SignInScreen: undefined;
  SignInMfaScreen: {message: string; email: string};
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  VerifyResetPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  LandingScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditScreen: undefined;
  SecurityScreen: undefined;
  PrivacyPolicyScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LandingScreen"
        component={LandingScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="SignInScreen"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="SignInMfaScreen"
        component={SignInMfaScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="VerifyResetPasswordScreen"
        component={VerifyResetPasswordScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="EditScreen"
        component={EditScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="SecurityScreen"
        component={SecurityScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
    </Stack.Navigator>
  );
};
