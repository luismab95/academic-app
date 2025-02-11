import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {appTheme, appThemeNavigation} from './presentation/theme/theme';
import * as eva from '@eva-design/eva';

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={appTheme()}>
        <NavigationContainer theme={{...(appThemeNavigation() as any)}}>
          {/* //TODO AGREGAR AUTH PROVIDER */}
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export default App;
