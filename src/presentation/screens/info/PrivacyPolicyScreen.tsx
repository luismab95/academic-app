import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';
import {TopNavigationApp} from '../../components/ui/TopNavigation';

interface Props
  extends StackScreenProps<RootStackParams, 'PrivacyPolicyScreen'> {}

export const PrivacyPolicyScreen = ({navigation}: Props) => {
  return (
    <>
      <TopNavigationApp title="Pólitica de Privacidad" />
      <Layout style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          {/* Space */}
          <Layout style={{height: 40}} />

          <Text
            category="h5"
            style={{textAlign: 'justify', marginVertical: 10}}>
            1. Lorem ipsum dolor sit amet
          </Text>

          <Text
            category="p1"
            appearance="hint"
            style={{textAlign: 'justify', marginVertical: 10}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            eum facere asperiores nihil, consequatur architecto dolorum
            excepturi, quam blanditiis dicta, quaerat nemo sint sed! Libero
            aspernatur tenetur placeat similique veniam. Sunt dicta odio ratione
            rem voluptatibus laudantium, nobis voluptas error accusamus.
            Blanditiis animi, illum ex cumque praesentium, voluptatum aliquid
            quos ea unde numquam accusamus. Nobis tenetur veniam illum inventore
            nam. Velit omnis saepe recusandae ipsam, nobis atque aliquam iusto.
            Porro recusandae mollitia atque accusantium dolore, harum fugit
            molestias dolores vitae provident aperiam omnis repellat, cumque ex
            .
          </Text>

          <Text
            category="h5"
            style={{textAlign: 'justify', marginVertical: 10}}>
            2. Lorem ipsum dolor sit amet
          </Text>

          <Text
            category="p1"
            appearance="hint"
            style={{textAlign: 'justify', marginVertical: 10}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            eum facere asperiores nihil, consequatur architecto dolorum
            excepturi, quam blanditiis dicta, quaerat nemo sint sed! Libero
            aspernatur tenetur placeat similique veniam. Sunt dicta odio ratione
            rem voluptatibus laudantium, nobis voluptas error accusamus.
            Blanditiis animi, illum ex cumque praesentium, voluptatum aliquid
            quos ea unde numquam accusamus. Nobis tenetur veniam illum
            inventore.
          </Text>

          <Text
            category="h5"
            style={{textAlign: 'justify', marginVertical: 10}}>
            3. Lorem ipsum sit amet
          </Text>

          <Text
            category="p1"
            appearance="hint"
            style={{textAlign: 'justify', marginVertical: 10}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            eum facere asperiores nihil, consequatur architecto dolorum
            excepturi, quam blanditiis dicta, quaerat nemo sint sed! Libero
            aspernatur tenetur placeat similique veniam. Sunt dicta odio ratione
            rem voluptatibus laudantium, nobis voluptas error accusamus.
          </Text>
        </ScrollView>
      </Layout>
    </>
  );
};
