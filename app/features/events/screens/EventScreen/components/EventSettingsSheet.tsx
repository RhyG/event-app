import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { ReactNode, useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Screens } from '@app/navigation/screens';

import { copyEventAccessCode, copyEventInvite } from '@feature/events/services/EventService';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const SNAP_POINTS = ['25%', '60%'];

function SettingsRow({ label, onPress, icon }: { label: string; onPress: () => void; icon: ReactNode }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsRow}>
      {icon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

export function EventSettingsSheet({ accessCode, eventName, eventId }: { accessCode: string; eventName: string; eventId: string }) {
  const navigation = useNavigation();
  const { theme } = useThemedStyles(stylesFn);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useHeaderOptions({
    headerRight: () => (
      <TouchableOpacity onPress={openSheet} hitSlop={{ left: 30, top: 40, right: 40, bottom: 40 }}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    ),
  });

  function closeSheet() {
    bottomSheetRef.current?.close();
  }

  function openSheet() {
    bottomSheetRef.current?.present();
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <TouchableWithoutFeedback
        onPress={() => {
          closeSheet();
        }}>
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  function navigateToEditEventScreen() {
    closeSheet();
    navigation.navigate(Screens.EditEventScreen, { id: eventId });
  }

  return (
    <BottomSheetModal ref={bottomSheetRef} index={1} snapPoints={SNAP_POINTS} enablePanDownToClose={true} backdropComponent={renderBackdrop}>
      <VBox>
        <SettingsRow
          label="Share event invite"
          onPress={() => copyEventInvite(eventName, accessCode)}
          icon={<Feather name="share" size={20} color={theme.icon.primaryColour} />}
        />
        <SettingsRow
          label="Copy event access code"
          onPress={() => copyEventAccessCode(accessCode)}
          icon={<Feather name="copy" size={20} color={theme.icon.primaryColour} />}
        />
        {/* TODO: Link to printable PDF hosted somewhere that shows the QR code and a nice message */}
        <SettingsRow label="Generate shareable QR code" onPress={() => {}} icon={<AntDesign name="qrcode" size={20} color={theme.icon.primaryColour} />} />
        <SettingsRow label="Edit event" onPress={navigateToEditEventScreen} icon={<Feather name="edit-2" size={20} color={theme.icon.primaryColour} />} />
      </VBox>
    </BottomSheetModal>
  );
}

const stylesFn = ({ spacing }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    settingsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.medium,
      gap: spacing.small,
    },
  });
