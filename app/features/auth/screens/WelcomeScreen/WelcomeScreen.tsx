import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import I18n from 'i18n-js';
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
    <WelcomeFlowScreen heading={I18n.t('welcomeScreen.heading')} subheading={I18n.t('welcomeScreen.subheading')}>
      <Button
        preset="secondary"
        onPress={navigateToEmailAuthScreen}
        label={`Sign ${showingLogin ? 'in' : 'up'} with email`}
        LeftAccessory={() => <Feather name="mail" size={20} color={theme.icon.primaryColour} style={{ marginRight: 5 }} />}
      />
      <HBox gap="small" mt="small">
        {Platform.OS === 'ios' && (
          <Button preset="secondary" onPress={() => console.log('')} style={{ flex: 1 }}>
            <AntDesign name="apple1" size={24} color={theme.icon.primaryColour} />
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

      <HBox alignItems="center" justifyContent="center" mt="medium" mb="large">
        <View style={styles.divider} />
        <Text colour={theme.colours.textSubdued} style={styles.or}>
          Or
        </Text>
        <View style={styles.divider} />
      </HBox>

      <Button onPress={() => navigation.navigate(Screens.JoinEventScreen)} label={I18n.t('common.joinEvent')} />
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

WelcomeScreen.screenName = 'WelcomeScreen' as const;
