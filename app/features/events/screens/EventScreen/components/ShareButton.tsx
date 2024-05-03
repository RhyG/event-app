import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { getEventInvite } from '@core/domains/events/services/EventService';
import { useToastContext } from '@core/providers/ToastProvider';

import { Icon } from '@ui/components/Icon';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

function copyEventInvite(eventName: string, eventAccessCode: string) {
  const invite = getEventInvite(eventName, eventAccessCode);
  Clipboard.setString(invite);
}

export function ShareButton({ eventName, eventAccessCode }: { eventName: string; eventAccessCode: string }) {
  const { showToast } = useToastContext();

  const { styles, theme } = useThemedStyles(stylesFn);

  function onSharePress() {
    copyEventInvite(eventName, eventAccessCode);
    showToast({ type: 'SUCCESS', message: 'Event invite copied to clipboard' });
  }

  return (
    <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
      <Icon family="Feather" name="share" size={20} color={theme.colours.palette.sky['700']} />
    </TouchableOpacity>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    shareButton: {
      backgroundColor: theme.colours.palette.sky['50'],
      padding: 8,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
