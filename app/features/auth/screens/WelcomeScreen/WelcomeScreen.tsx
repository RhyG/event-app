import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { TwoPartPressableText } from '@feature/auth/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';
import { useWelcomeFlowContext } from '@feature/auth/context/WelcomeFlowContext';

import { Button } from '@ui/components/Button';
import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

export function WelcomeScreen({ navigation }: ScreenProp<'WelcomeScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  const { formMode, toggleFormMode } = useWelcomeFlowContext();
  const showingLogin = formMode === 'LOGIN';

  function navigateToEmailAuthScreen() {
    if (showingLogin) {
      navigation.navigate(Screens.EmailLoginScreen);
    } else {
      navigation.navigate(Screens.EmailSignUpScreen);
    }
  }

  return (
    <WelcomeFlowScreen heading="Welcome" subheading="Sign in to create an event, or join one that already exists.">
      <Button preset="secondary" onPress={navigateToEmailAuthScreen} label={`Sign ${showingLogin ? 'in' : 'up'} with email`} />
      <HBox gap="small" mt="small">
        {Platform.OS === 'ios' && (
          <Button preset="secondary" onPress={() => console.log('')} style={{ flex: 1 }}>
            <AntDesign name="apple1" size={24} color="black" />
          </Button>
        )}
        <Button preset="secondary" onPress={() => console.log('')} style={{ flex: 1 }}>
          <Image style={{ height: 24, width: 24 }} source={require('/assets/google-symbol.png')} contentFit="cover" transition={1000} />
        </Button>
        <Button preset="secondary" onPress={() => console.log('')} style={{ flex: 1 }}>
          <Image style={{ height: 24, width: 24 }} source={require('/assets/Facebook_Logo_Primary.png')} contentFit="cover" transition={1000} />
        </Button>
      </HBox>

      <VBox mt="small">
        <TwoPartPressableText
          texts={[showingLogin ? 'New here?' : 'Have an account already?', showingLogin ? 'Create an account' : 'Sign in']}
          onPress={toggleFormMode}
        />
      </VBox>

      <HBox alignItems="center" justifyContent="center" mv="large">
        <View style={styles.divider} />
        <Text colour={theme.colours.textSubdued} style={styles.or}>
          Or
        </Text>
        <View style={styles.divider} />
      </HBox>

      <Button onPress={() => navigation.navigate(Screens.JoinEventScreen)} label="Join event" />
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    or: {
      marginHorizontal: 12,
    },
    divider: {
      borderWidth: StyleSheet.hairlineWidth,
      flex: 1,
      borderColor: theme.colours.borderColour,
    },
  });
