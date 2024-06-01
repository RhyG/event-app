import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { Button } from '@ui/components/Button';
import { Icon } from '@ui/components/Icon';
import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';

function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Button onPress={onPress} style={{ position: 'absolute', top: 16, right: 16 }}>
      <Icon family="Feather" name="x" size={32} color="white" />
    </Button>
  );
}

export function QRCodeScannerScreen({ navigation }: ScreenProp<typeof QRCodeScannerScreenName>) {
  const [permission, requestPermission] = useCameraPermissions();

  // Camera permissions are still loading.
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <VBox flex={1} justifyContent="center">
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} label="grant permission" />
      </VBox>
    );
  }

  function dismissCamera() {
    navigation.goBack();
  }

  return (
    <>
      <VBox flex={1} justifyContent="center">
        <CameraView style={styles.camera} facing="back">
          <CloseButton onPress={dismissCamera} />
        </CameraView>
      </VBox>
    </>
  );
}

export const QRCodeScannerScreenName = 'QRCodeScannerScreen' as const;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
