import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';
import { ReactNode, useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { copyEventAccessCode, copyEventInvite } from '@feature/events/services/EventService';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { EditEventScreenName } from '../../EditEventScreen/EditEventScreen';

const SNAP_POINTS = ['25%', '35%'];

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
    navigation.navigate(EditEventScreenName, { id: eventId });
  }

  return (
    <BottomSheetModal ref={bottomSheetRef} index={1} snapPoints={SNAP_POINTS} enablePanDownToClose={true} backdropComponent={renderBackdrop}>
      <VBox>
        <SettingsRow
          label={I18n.t('eventScreen.shareEventInvite')}
          onPress={() => copyEventInvite(eventName, accessCode)}
          icon={<Feather name="share" size={20} color={theme.icon.primaryColour} />}
        />
        <SettingsRow
          label={I18n.t('eventScreen.copyEventAccessCode')}
          onPress={() => copyEventAccessCode(accessCode)}
          icon={<Feather name="copy" size={20} color={theme.icon.primaryColour} />}
        />
        {/* TODO: Link to printable PDF hosted somewhere that shows the QR code and a nice message */}
        <SettingsRow
          label={I18n.t('eventScreen.generateQRCode')}
          onPress={() => {}}
          icon={<AntDesign name="qrcode" size={20} color={theme.icon.primaryColour} />}
        />
        <SettingsRow
          label={I18n.t('eventScreen.editEvent')}
          onPress={navigateToEditEventScreen}
          icon={<Feather name="edit-2" size={20} color={theme.icon.primaryColour} />}
        />
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
