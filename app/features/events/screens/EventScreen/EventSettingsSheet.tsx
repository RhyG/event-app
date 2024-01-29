import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

function SettingsRow({ label, onPress, icon }: { label: string; onPress: () => void; icon: ReactNode }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsRow}>
      {icon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

export function EventSettingsSheet() {
  const { styles } = useThemedStyles(stylesFn);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useHeaderOptions({
    headerRight: () => (
      <TouchableOpacity onPress={openSheet}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    ),
  });

  const snapPoints = useMemo(() => ['25%', '60%'], []);

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

  return (
    <BottomSheetModal ref={bottomSheetRef} index={1} snapPoints={snapPoints} enablePanDownToClose={true} backdropComponent={renderBackdrop}>
      <VBox>
        <SettingsRow label="Share event invite" onPress={() => {}} icon={<Feather name="share" size={20} color="black" />} />
        <SettingsRow label="Copy event access code" onPress={() => {}} icon={<Feather name="copy" size={20} color="black" />} />
        <SettingsRow label="Generate shareable QR code" onPress={() => {}} icon={<AntDesign name="qrcode" size={20} color="black" />} />
        <SettingsRow label="Edit event" onPress={() => {}} icon={<Feather name="edit-2" size={20} color="black" />} />
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
