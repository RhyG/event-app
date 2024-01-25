import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

export function WelcomeScreen({ navigation }: ScreenProp<'WelcomeScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  const [formMode, setFormMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const showingLogin = formMode === 'LOGIN';

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.secondaryBackground },
  });

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
      <View style={styles.providersContainer}>
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
      </View>
      <View style={styles.signUpTextContainer}>
        <Text size="xs">{showingLogin ? 'New here?' : 'Have an account already?'} </Text>
        <TouchableOpacity onPress={() => setFormMode(currentMode => (currentMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN'))} style={{ borderBottomWidth: 1 }}>
          <Text size="xs">{showingLogin ? 'Create an account' : 'Sign in'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividers}>
        <View style={styles.divider} />
        <Text colour={theme.colours.textSubdued} style={styles.or}>
          Or
        </Text>
        <View style={styles.divider} />
      </View>

      <View>
        <Button onPress={() => navigation.navigate(Screens.JoinEventScreen)} label="Join event" />
      </View>
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    or: { marginHorizontal: 12 },
    dividers: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: theme.spacing.large,
    },
    divider: {
      borderWidth: StyleSheet.hairlineWidth,
      flex: 1,
      borderColor: theme.colours.borderColour,
    },
    providersContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: theme.spacing.small,
    },
    signUpTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing.medium,
    },
  });
