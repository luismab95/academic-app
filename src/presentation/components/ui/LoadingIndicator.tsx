import {View, ImageProps} from 'react-native';
import {Spinner} from '@ui-kitten/components';

export const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, {justifyContent: 'center', alignItems: 'center'}]}>
    <Spinner status="primary" size="medium" />
  </View>
);
