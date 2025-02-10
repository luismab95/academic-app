import {PaperProvider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IonIcon from '@react-native-vector-icons/ionicons';

function App(): React.JSX.Element {
  return (
    <PaperProvider
      settings={{
        icon: props => <IonIcon {...(props as any)} />,
      }}>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
          Welcome, but there is nothing to see here!
        </Text>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
