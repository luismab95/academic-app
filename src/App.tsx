import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  IconRegistry,
  ModalService,
} from '@ui-kitten/components';
import {appThemeNavigation, ThemeContext} from './presentation/theme/theme';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {AuthProvider} from './presentation/providers/auth.provider';
import {authStore, ThemeHook} from './shared';
import * as eva from '@eva-design/eva';

ModalService.setShouldUseTopInsets = true;
interface AppStateChangeHandler {
  (nextAppState: string): void;
}

function App(): React.JSX.Element {
  const {theme, toggleTheme} = ThemeHook();
  const {logout} = authStore();

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        await logout!();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <NavigationContainer theme={{...(appThemeNavigation() as any)}}>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
