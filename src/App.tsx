import {NavigationContainer} from '@react-navigation/native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  IconRegistry,
  ModalService,
} from '@ui-kitten/components';
import {appThemeNavigation, ThemeContext} from './presentation/theme/theme';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {ThemeHook} from './shared/hooks/ThemeHook';
import * as eva from '@eva-design/eva';

ModalService.setShouldUseTopInsets = true; 

function App(): React.JSX.Element {
  const {theme, toggleTheme} = ThemeHook();
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <NavigationContainer theme={{...(appThemeNavigation() as any)}}>
            {/* //TODO AGREGAR AUTH PROVIDER */}
            <StackNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
